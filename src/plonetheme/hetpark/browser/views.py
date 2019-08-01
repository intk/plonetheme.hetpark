#!/usr/bin/env python
# -*- coding: utf-8 -*-
from Acquisition import aq_inner, aq_parent
from Products.Five import BrowserView
from plone.app.multilingual.subscriber import createdEvent

from collective.leadmedia.utils import addCropToTranslation
from plone.app.multilingual.interfaces import ITranslatable
from plone.app.multilingual.interfaces import ITranslationManager

from plone.app.contenttypes.browser.collection import CollectionView
from plone.app.uuid.utils import uuidToCatalogBrain
from plone.event.interfaces import IEvent

from datetime import date
from DateTime import DateTime
import time

from plone.app.event.browser.event_listing import EventEventListing, EventListing, EventListingIcal
import plone.api
from zope.component import getMultiAdapter
from plone.event.interfaces import IEvent
from zope.contentprovider.interfaces import IContentProvider
from zope.schema import getFields, getFieldsInOrder

from Products.CMFCore.utils import getToolByName
from collective.behavior.exhibition.behavior import IExhibition

from bs4 import BeautifulSoup as BSHTML
import re
YEAR_LIMIT = 2024

import json

from zope.i18nmessageid import MessageFactory
_ = MessageFactory('plonetheme.hetpark')


NOT_ALLOWED = [None, '', ' ', 'None']
NOT_ALLOWED_FIELDS = ['priref', 'nummer_cm', 'cm_nummer', 'start_date', 'end_date', 'notes', 'show_notes', 'alternative_title']


def is_event_past(event):
    """ Checks if the event is already past """

    rec = getattr(event, 'recurrence', None)
    if rec:
        return False

    if event.portal_type != 'Event':
        return False
    else:
        try:
            t = DateTime(time.time())
            if event.end is not None:
                end = DateTime(event.end)
                return end.year() < t.year() or (end.year() == t.year() and end.month() < t.month()) or(end.year() == t.year() and end.month() == t.month() and end.day() < t.day())
            else:
                start = DateTime(event.start)
                return start.year() < t.year() or (start.year() == t.year() and start.month() < t.month()) or(start.year() == t.year() and start.month() == t.month() and start.day() < t.day())
        except:
            return False
    return True


class ExhibitionArchiveView(BrowserView):

    # # # # # #
    # Utils   #
    # # # # # #
    def get_schema(self, item):
        return getFieldsInOrder(IExhibition)

    def final_text(self, value):
        return self.context.translate(_(value))

    # # # # # # # # # # # #
    # Exhibition fields   # 
    # # # # # # # # # # # #
    def object_templates(self, template=None, value=""):
        TEMPLATES = {
            "label":"<div class='col-lg-4 col-md-4 col-sm-4 col-xs-12 object-label'><p>%s</p></div>",
            "value":"<div class='col-lg-8 col-md-8 col-sm-8 col-xs-12 object-value'><p>%s</p></div>"
        }
        if not template:
            return TEMPLATES
        else:
            if not value:
                return TEMPLATES.get(template, '')
            else:
                template = TEMPLATES.get(template, '')
                return template % (value)

    def get_custom_fields(self):
        CUSTOM_FIELDS = {
            "documentation": self.generate_documentation_value,
            "persistent_url": self.generate_handle_url_value,
            "designer": self.generate_designer_value
        }
        return CUSTOM_FIELDS

    def get_datagrid_subfield(self, field):

        DATAGRID_SUBFIELDS = {}

        SEPARATORS = {
            "notes":"<br>",
            "associated_person": "<br>",
        }

        SEARCHABLE = {}

        is_searchable = False

        separator = ", "
        if field in SEPARATORS:
            separator = SEPARATORS[field]

        if field in SEARCHABLE:
            is_searchable = SEARCHABLE[field]

        if field in DATAGRID_SUBFIELDS:
            return DATAGRID_SUBFIELDS[field], separator, is_searchable
        else:
            return None, separator, is_searchable

    def generate_handle_url_value(self, field, item):
        handle_url = getattr(item, field, None)
        
        if handle_url:
            value = "%s: <a href='%s' target='_blank'>%s</a>" %(self.context.translate(_("Handle url desc")), handle_url, handle_url)
            return value

        return ""

    def generate_designer_value(self, field, item):
        designer_value = getattr(item, field, None)
        
        if designer_value:
            designer_value_fixed = self.fix_author_name(designer_value)
            return designer_value_fixed
        return ""

    def generate_regular_datagrid(self, field, item, subfield, separator=', ', is_searchable=False):
        value = getattr(item, field, None)

        values = []

        if subfield:
            if value:
                for subitem in value:
                    if subfield in subitem:
                        subfield_value = subitem.get(subfield, '')
                        if subfield_value:
                            if separator == "<br>":
                                if not is_searchable:
                                    values.append("<span>%s</span>" %(subfield_value))
                                else:
                                    subfield_value = "<a href='/%s/@@search?%s=%s'>%s</a>" %(getattr(self.context, 'language', 'nl'), is_searchable, url_quote(subfield_value),subfield_value)
                                    values.append("<span>%s</span>" %(subfield_value))
                            else:
                                if not is_searchable:
                                    values.append("%s" %(subfield_value))
                                else:
                                    if is_searchable == "content_motif":
                                        subfield_value = "<a href='/%s/@@search?content_motifs=%s*'>%s</a>" %(getattr(self.context, 'language', 'nl'), url_quote(subfield_value), subfield_value)
                                    else:
                                        subfield_value = "<a href='/%s/@@search?%s=%s'>%s</a>" %(getattr(self.context, 'language', 'nl'), is_searchable, url_quote(subfield_value), subfield_value)
                                    values.append("%s" %(subfield_value))
                        else:
                            pass
                    else:
                        pass
            else:
                return None

            final_value = separator.join(values)
            return final_value
        else:
            return None

    def fix_author_name(self, value):
        author = value
        if value:
            try:
                author_split = value.split(',')
                if len(author_split) > 1:
                    firstname = author_split[1]
                    lastname = author_split[0]
                    firstname = firstname.strip()
                    lastname = lastname.strip()
                    author = "%s %s" %(firstname, lastname)
                    return author
            except:
                return value

        return author


    def generate_relateditems_value(self, field, item):
        value = getattr(item, field, None)
        related_objects = []
        final_value = ""
        catalog = plone.api.portal.get_tool('portal_catalog')

        if value:
            for related_item in value:
                brains = catalog(path={'query': related_item.to_path, 'depth': 0})
                if brains:
                    brain = brains[0]
                    title = brain.Title
                    description = brain.Description
                    url = brain.getURL()
                    new_rel = "%s" %(title)

                    if description:
                        new_rel = "%s, %s" %(new_rel, description)

                    if new_rel:
                        if "In deze tentoonstelling waren geen objecten uit de collectie van het HetPark te zien" not in title:
                            new_rel_html = "<li><a href='%s'><span>%s</span></a></li>" %(url, new_rel)
                        else:
                            new_rel_html = "<li><span>%s</span></li>" %(new_rel)
                        related_objects.append(new_rel_html)

        if len(related_objects) > 3:

            text_en = ["Show more +", "Show less -"]
            text_nl = ["Toon alles +", "Toon minder -"]

            text_expand = text_nl
            if getattr(self.context, 'language', 'nl') == 'en':
                text_expand = text_en

            related_objects_show = related_objects[:3]
            related_objects_hide = related_objects[3:]
            trigger = "<p><a href='javascript:void();' class='doc-more-info-obj' data-toggle='collapse' data-target='#doc-list-obj' aria-expanded='false'><span class='notariaexpanded'>%s</span><span class='ariaexpanded'>%s</span></a></p>" %(text_expand[0], text_expand[1])
            related_objects_show_html = "<ul>"+"".join(related_objects_show)+"</ul>"
            related_objects_hide_html = "<ul>"+"".join(related_objects_hide)+"</ul>"
            related_objects_hide_div = "<div id='doc-list-obj' class='collapse' aria-expanded='false'><p>%s</p></div>" %(related_objects_hide_html)

            final_value = related_objects_show_html + trigger + related_objects_hide_div
            
            return final_value

        if related_objects:
            final_value = "<ul>"+"".join(related_objects)+"</ul>"
        else:
            text_no_value = "In deze tentoonstelling waren geen objecten uit de collectie van het HetPark te zien"
            if getattr(self.context, 'language', 'nl') == 'en':
                text_no_value = "No objects from the HetPark collection were shown in this exhibition"
            final_value = "<ul><li><span>%s</span></li></ul>" %(text_no_value)

        return final_value

    def generate_documentation_value(self, field, item):
        value = getattr(item, field, None)
        documentations = []

        if value:
            try:
                value_sorted = sorted(list(value), key=lambda a: a.get('title', '').lower() if a.get('title', '') else a.get('title', ''))
            except:
                value_sorted = value

            # Check if DataGridField
            for doc in value_sorted:

                new_doc = ""

                title = doc.get('title', '')
                lead_word = doc.get('lead_word', '')
                author = doc.get('authors', '')
                publisher = doc.get('publishers', '')
                statement_of_responsibility = doc.get('statement_of_responsibility', '')
                place_of_publication = doc.get('place_of_publication', '')
                year_of_publication = doc.get('year_of_publication', '')
                pagination = doc.get('pagination', '')

                authors = []

                for name in author:
                    final_name = self.fix_author_name(name)
                    if final_name:
                        authors.append(final_name)

                authors_final = ", ".join(authors)

                dates = ""

                if place_of_publication and year_of_publication:
                    dates = "%s, %s" %(place_of_publication, year_of_publication)
                elif not place_of_publication and year_of_publication:
                    dates = "%s" %(year_of_publication)
                elif not year_of_publication and place_of_publication:
                    dates = "%s" %(place_of_publication)
                else:
                    dates = dates

                if lead_word and title:
                    new_doc = "%s %s" %(lead_word, title)
                elif not lead_word and title:
                    new_doc = "%s" %(title)
                elif lead_word and not title:
                    new_doc = "%s" %(lead_word)
                else:
                    new_doc = new_doc

                if authors_final and not statement_of_responsibility:
                    new_doc = "%s, %s" %(new_doc, authors_final)
                elif statement_of_responsibility and not authors_final:
                    new_doc = "%s, %s" %(new_doc, statement_of_responsibility)
                elif statement_of_responsibility and authors_final:
                    new_doc = "%s, %s" %(new_doc, statement_of_responsibility)
                else:
                    new_doc = new_doc

                if publisher:
                    all_publishers = ", ".join(publisher)
                    new_doc = "%s, %s" %(new_doc, all_publishers)

                if dates:
                    new_doc = "%s (%s)" %(new_doc, dates)

                if pagination:
                    new_doc = "%s (%s)" %(new_doc, pagination)

                if new_doc:
                    documentations.append("<li><span>"+new_doc+"</span></li>")


        if len(documentations) > 3:

            text_en = ["Show more +", "Show less -"]
            text_nl = ["Toon alles +", "Toon minder -"]

            text_expand = text_nl
            if getattr(self.context, 'language', 'nl') == 'en':
                text_expand = text_en

            documentation_show = documentations[:3]
            documentation_hide = documentations[3:]
            trigger = "<p><a href='javascript:void();' class='doc-more-info' data-toggle='collapse' data-target='#doc-list' aria-expanded='false'><span class='notariaexpanded'>%s</span><span class='ariaexpanded'>%s</span></a></p>" %(text_expand[0], text_expand[1])
            documentation_show_html = "<ul>"+"".join(documentation_show)+"</ul>"
            documentation_hide_html = "<ul>"+"".join(documentation_hide)+"</ul>"
            documentation_hide_div = "<div id='doc-list'class='collapse' aria-expanded='false'><p>%s</p></div>" %(documentation_hide_html)

            final_value = documentation_show_html + trigger + documentation_hide_div
            return final_value

        if documentations:
            final_value = "<ul>"+"".join(documentations)+"</ul>"
        else:
            final_value = ""
        return final_value

    def generate_handle_url_value(self, field, item):
        handle_url = getattr(item, field, None)
        
        if handle_url:
            value = "%s: <a href='%s' target='_blank'>%s</a>" %(self.context.translate(_("Handle url desc")), handle_url, handle_url)
            return value

        return ""

    def generate_production_value(self, field, item):
        production_value = getattr(item, field, None)
        productions = []

        if production_value:
            for production in production_value:
                date_start = production.get('date_start', '')
                date_start_precision = production.get('date_start_precision', '')
                date_end = production.get('date_end', '')
                date_end_precision = production.get('date_end_precision', '')
                notes = production.get('notes', '')

                new_production = ""

                start_date = ""

                if date_start_precision:
                    start_date = "%s" %(date_start_precision)

                if date_start:
                    date_start_split =  date_start.split("-")
                    if date_start_split:
                        date_start_year = date_start_split[0]
                        start_date = "%s %s" %(start_date, date_start_year)
                    else:
                        start_date = ""
                else:
                    start_date = ""
                start_date = start_date.strip()

                end_date = ""

                if date_end_precision:
                    end_date = "%s" %(date_end_precision)

                if date_end:
                    date_end_split =  date_end.split("-")
                    if date_end_split:
                        date_end_year = date_end_split[0]
                        end_date = "%s %s" %(end_date, date_end_year)
                    else:
                        end_date = ""
                else:
                    end_date = ""
                end_date = end_date.strip()


                if start_date and end_date:
                    if start_date == end_date:
                        new_production = "%s" %(start_date)
                    else:
                        new_production = "%s - %s" %(start_date, end_date)
                if not start_date and end_date:
                    new_production = "%s" %(end_date)
                elif start_date and not end_date:
                    new_production = "%s" %(start_date)
                else:
                    new_production = new_production

                if new_production:
                    if notes:
                        new_production = "%s (%s)" %(new_production, notes)
 
                if new_production:
                    new_production = new_production.strip()
                    productions.append(new_production)


        final_value = "<br>".join(productions)
        return final_value
        

    def generate_regular_value(self, field, item):
        value = getattr(self.context, field, None)
        if field in ['organiser'] and value == 'HetPark':
            value = ''

        if value and type(value) == list:

            subfield, separator, is_searchable = self.get_datagrid_subfield(field)

            if subfield:
                value = self.generate_regular_datagrid(field, item, subfield, separator, is_searchable)
                return value
            else:
                return None
            return None
        else:
            return value

    def get_fields(self):
        result = {"fields":[]}

        custom_fields = self.get_custom_fields()
        fields = self.get_schema(self.context)

        for field, fieldschema in fields:
            # Check if field is allowed
            if field not in NOT_ALLOWED_FIELDS:
                title = fieldschema.title
                
                # Check if field as a custom generator
                if field in custom_fields:
                    value = custom_fields[field](field, self.context)
                else:
                    value = self.generate_regular_value(field, self.context)
                
                if field == 'persistent_url':
                    related_items = self.generate_relateditems_value('relatedItems', self.context)
                    if related_items:
                        related_items_title = 'related_objects'
                        new_related_field = {"label": self.object_templates('label', self.final_text(related_items_title)), "value": self.object_templates('value', related_items)}
                        result['fields'].append(new_related_field)

                if value:
                    new_field = {"label": self.object_templates('label', self.final_text(title)), "value": self.object_templates('value', value)}
                    result['fields'].append(new_field)
            else:
                # Field is not allowed
                pass

        return result



class ContextToolsView(BrowserView):

    def render_belowcontent_portlets(self):
        portlet_manager = getMultiAdapter(
            (self.context, self.request, self.__parent__),
            name='collective.belowcontentportlets'
        )
        portlet_manager.update()
        return portlet_manager.render()


    def get_creators_data(self, item):

        membership_tool = getToolByName(
            self.context, 'portal_membership'
        )

        creators = item.creators
        creator_name = ""
        for creator_id in creators:
            groups = plone.api.group.get_groups(username=creator_id)
            for group in groups:
                if 'Blog' == group.id:
                    creator_info = membership_tool.getMemberInfo(creator_id)
                    portrait = membership_tool.getPersonalPortrait(creator_id)
            
                    return {
                        'info': creator_info, 
                        'portrait': portrait
                    }
        return {
            'info': '',
            'portrait': ''
        }
    
    def getFixedLastWord(self, text):

        text_split = text.split(" ")
        if len(text_split) > 1:
            last_word = text_split[-1]
            before_last_word = text_split[len(text_split)-2]
            word_to_replace = "%s&nbsp;%s" %(before_last_word, last_word)
            text_split[len(text_split)-2] = word_to_replace
            text_split[-1] = ''
        else:
            return text

        text = " ".join(text_split)
        return text

    def getPortraitDescription(self, item):
        description = item.Description()

        description_split = description.split(" ")
        if len(description_split) > 1:
            last_word = description_split[-1]
            before_last_word = description_split[len(description_split)-2]
            word_to_replace = "%s&nbsp;%s" %(before_last_word, last_word)
            description_split[len(description_split)-2] = word_to_replace
            description_split[-1] = ''

        description = " ".join(description_split)
        return description

    def getObjectImages(self, item, event_view=False):
        if event_view:
            obj = item
        else:
            obj = item.getObject()
            
        slideshow = getattr(obj, 'slideshow', None)

        if slideshow:
            if len(slideshow) > 1:
                images = []
                for img_id in slideshow:
                    img = slideshow[img_id]
                    if getattr(img, 'portal_type', None) == "Image":
                        url = img.absolute_url()+"/@@images/image/large"
                        description = getattr(img, 'description', None)

                        new_image = {
                            "url": url,
                            "description": description
                        }

                        images.append(new_image)
                    else:
                        return []  

                if len(images) > 1:
                    if event_view:   
                        return images
                    else:
                        return images[1:]
                else:
                    return []
            else:
                return []

        else:
            return json.dumps([])

    def getCollectionItems(self, item):
        collection = item.getObject()

        results = []
        if collection is not None:
            results = collection.queryCatalog()

        return results
        
    def getObjectCreator(self, obj):
        try:
            value = getattr(obj, 'creator', '')
            if value:
                creators = []
                for creator in value:
                    new_creator = ""
                    name = creator.get('name', '')

                    if name:
                        name_split = name.split(",")
                        if len(name_split) > 1:
                            firstname = name_split[1]
                            lastname = name_split[0]
                            name = "%s %s" %(firstname, lastname)

                        name = name.strip()
                        creators.append(name)

                final_creators = ", ".join(creators)
                return final_creators
            else:
                return '' 
        except:
            raise
            return ''

    def getObjectDetails(self, image):
        try:
            slideshow = image.aq_parent

            if slideshow and slideshow.id == 'slideshow':

                obj = slideshow.aq_parent
                if obj.portal_type == "Object":

                    details = {}
                    details['freeofcopyright'] = getattr(obj, 'freeofcopyright', '')
                    details['rights'] = getattr(obj, 'rights', '')
                    details['object_number'] = getattr(obj, 'object_number', '')
                    details['url'] = obj.absolute_url()
                    details['creator'] = self.getObjectCreator(obj)
                    details['title'] = getattr(obj, 'title', '')
                    details['_id'] = getattr(obj, 'id', '')
                    
                    return details
            else:
                return {}

        except:
            return {}


    def trimText(self, text, limit):
        try:
            if text != None:
                if len(text) > limit:
                    res = text[0:limit]
                    lastspace = res.rfind(" ")
                    res = res[0:lastspace] + " ..."
                    return res
                else:
                    return text
            else:
                return ""
        except:
            return text

    def toLocalizedTime(self, time, long_format=None, time_only=None):
        """Convert time to localized time
        """
        util = getToolByName(self.context, 'translation_service')
        return util.ulocalized_time(time, long_format, time_only, self.context,
                                    domain='plonelocales')

    def get_pub_date(self, item):
        try:
            date = item.EffectiveDate()
            if not date or date == 'None':
                return None
            return self.toLocalizedTime(DateTime(date))
        except:
            return None

    def get_img_tags(self, data):
        soup = BSHTML(data)
        images = soup.findAll('img')
        if images:
            image = images[0]
            src = image['src']
            return src
        return ''

    def get_iframe_tags(self, data):
        soup = BSHTML(data)
        iframes = soup.findAll('iframe')
        if iframes:
            iframe = iframes[0]
            src = iframe['src']
            return src
        return ''

    def remove_img_tags(self, data):
        p = re.compile(r'<img.*?/>')
        return p.sub('', data)

    def remove_iframe_tags(self, data):
        p = re.compile(r'<iframe.*?/>')
        return p.sub('', data)


    def getIframeSrc(self, item):
        text = getattr(item, 'text', None)
        text_output = text.output
        iframe_src = ""
        iframe_src = self.get_iframe_tags(text_output)
        return iframe_src

    def getSlideStyles(self, item, slide_style="text-only"):
        text = getattr(item, 'text', None)
        text_output = text.output

        styles = ""

        if slide_style in ["image-slide"]:
            img_source = self.get_img_tags(text_output)

            styles = ""

            if img_source:
                styles = "background-image: url(%s);" %(img_source)
            else:
                styles = ""

        return styles
        
    def getSlideBodyText(self, item, slide_type="text-only"):
        text = getattr(item, 'text', None)

        if slide_type == "image-slide":
            new_text = self.remove_img_tags(text.output)
            return new_text

        if slide_type in ["video-slide", "video-slide right"]:
            new_text = self.remove_iframe_tags(text.output)
            return new_text

        output_text = getattr(text, 'output', '')
        return output_text

    def getSlideType(self, item):
        text = getattr(item, 'text', None)
        if text:

            if "side-text" in getattr(item, 'id', ''):
                if "image-left" in getattr(text, 'raw', ''):
                    return "side-text-slide left"
                elif "image-right" in getattr(text, 'raw', ''):
                    return "side-text-slide right"
                else:
                    return "side-text-slide"
            
            elif "<img" in getattr(text, 'raw', ''):
                return "image-slide"

            elif "<iframe" in getattr(text, 'raw', ''):
                if "text-align: right" in getattr(text, 'raw', ''):
                    return "video-slide right"
                else:
                    return "video-slide"
            else:
                return "text-only"
        else:
            return ""

    def hasPresentation(self, item):
        try:

            if not plone.api.user.is_anonymous():
                if 'presentation' in item:
                    return True
            else:
                if 'presentation' in item:
                    presentation_folder = item['presentation']
                    state = plone.api.content.get_state(obj=presentation_folder)
                    if state != 'published':
                        return False
                    else:
                        return True
                else:
                    return False
        except:
            pass

        return False

    def getPresentationItems(self, item):
        folder_contents = None
        if 'presentation' in item:
            presentation_folder = item['presentation']
            contents = presentation_folder.getFolderContents()
            folder_contents = [item for item in contents if getattr(item, 'portal_type', '') == 'Document']

        return folder_contents

    def getImageObject(self, item, scale="large", with_description=False):
        if item.portal_type == "Image":
            return item.getURL()+"/@@images/image/%s" %(scale)
        if item.leadMedia != None:
            uuid = item.leadMedia
            media_object = uuidToCatalogBrain(uuid)
            if media_object:
                if with_description:
                    img_data = {
                        "url": media_object.getURL()+"/@@images/image/%s" %(scale),
                        "description": media_object.Description
                    }
                    return img_data
                else:
                    return media_object.getURL()+"/@@images/image/%s" %(scale)
            else:
                return None
        else:
            return None

    def getImageBrain(self, item):
        img_brain = None

        if item.portal_type == "Image":
            return item
        
        if getattr(item, 'leadMedia', None) not in [None, '']:
            uuid = item.leadMedia
            media_object = uuidToCatalogBrain(uuid)
            if media_object:
                return media_object
            else:
                return None
        else:
            return None

    def getImageBrainSearch(self, item):
        if item:
            item_uid = item.UID()
            item_brain = uuidToCatalogBrain(item_uid)

            if item_brain:
                if item_brain.portal_type == "Image":
                        return item
                if getattr(item_brain, 'leadMedia', None) not in [None, '']:
                    uuid = item_brain.leadMedia
                    media_object = uuidToCatalogBrain(uuid)
                    if media_object:
                        return media_object
                    else:
                        return None
                else:
                    return None
            else:
                return None
        else:
            return None

    def is_event(self, obj):
        if getattr(obj, 'getObject', False):
            obj = obj.getObject()
        return IEvent.providedBy(obj)

    def isAnonymous(self):
        annon = True
        if not plone.api.user.is_anonymous():
            return False

        return annon

    def formatted_date_search(self, obj):
        item = obj
        provider = getMultiAdapter(
            (self.context, self.request, self),
            IContentProvider, name='formatted_date'
        )

        rec = getattr(item, 'recurrence', None)
        if rec:
            if "FREQ=DAILY" in rec:
                return self.context.translate(_("DAILY"))
            elif "FREQ=MONDAYFRIDAY" in rec:
                return self.context.translate(_("MONDAYFRIDAY"))
            elif "FREQ=WEEKDAYS" in rec:
                return self.context.translate(_("WEEKDAYS"))
            elif "FREQ=WEEKLY" in rec:
                return self.context.translate(_("WEEKLY"))
            elif "FREQ=MONTHLY" in rec:
                return self.context.translate(_("MONTHLY"))
            elif "FREQ=YEARLY" in rec:
                return self.context.translate(_("YEARLY"))
            else:
                return provider(item)
        else:
            end_date = getattr(item, 'end', None)
            if end_date:
                end = DateTime(end_date)
                if end.year() > YEAR_LIMIT:
                    return self.context.translate(_("permanent_collection"))
                else:
                    return provider(item)
            else:
                end_date = getattr(item, 'end', None)
                if end_date:
                    end = DateTime(end_date)
                    if end.year() > YEAR_LIMIT:
                        return self.context.translate(_("permanent_collection"))
                    else:
                        return provider(item)
                else:
                    return provider(item)

    def formatted_date(self, obj):
        item = obj.getObject()
        provider = getMultiAdapter(
            (self.context, self.request, self),
            IContentProvider, name='formatted_date'
        )

        rec = getattr(item, 'recurrence', None)
        if rec:
            if "FREQ=DAILY" in rec:
                return self.context.translate(_("DAILY"))
            elif "FREQ=MONDAYFRIDAY" in rec:
                return self.context.translate(_("MONDAYFRIDAY"))
            elif "FREQ=WEEKDAYS" in rec:
                return self.context.translate(_("WEEKDAYS"))
            elif "FREQ=WEEKLY" in rec:
                return self.context.translate(_("WEEKLY"))
            elif "FREQ=MONTHLY" in rec:
                return self.context.translate(_("MONTHLY"))
            elif "FREQ=YEARLY" in rec:
                return self.context.translate(_("YEARLY"))
            else:
                return provider(item)
        else:
            end_date = getattr(item, 'end', None)
            if end_date:
                end = DateTime(end_date)
                if end.year() > YEAR_LIMIT:
                    return self.context.translate(_("permanent_collection"))
                else:
                    return provider(item)
            else:
                return provider(item)

    def isSlideshowPublished(self, item):
        obj = item.getObject()
        slideshow = obj.get('slideshow', None)
        
        if slideshow:
            slideshow_brain = uuidToCatalogBrain(slideshow.UID())
            if slideshow_brain:
                if slideshow_brain.review_state != 'published':
                    return False
                else:
                    return True
            else:
                return True
        else:
            return True

    def isEventPast(self, event):
        """ Checks if the event is already past """

        rec = getattr(event, 'recurrence', None)
        if rec:
            return False

        if event.portal_type != 'Event':
            return False
        else:
            try:
                t = DateTime(time.time())
                if event.end is not None:
                    end = DateTime(event.end)
                    return end.year() < t.year() or (end.year() == t.year() and end.month() < t.month()) or(end.year() == t.year() and end.month() == t.month() and end.day() < t.day())
                else:
                    start = DateTime(event.start)
                    return start.year() < t.year() or (start.year() == t.year() and start.month() < t.month()) or(start.year() == t.year() and start.month() == t.month() and start.day() < t.day())
            except:
                return False
        return True

class OnlineExperienceView(CollectionView):

    def find_orientation(self, item):
        if type(item) == str:
            if item == "L":
                return "landscape"
            else:
                return "portrait"

        item_class = ""
        if item.portal_type == "Image":
            image_obj = item.getObject()
            if getattr(image_obj, 'image', None):
                try:
                    w, h = image_obj.image.getImageSize()
                    if w > h:
                        item_class = "%s" %('landscape')
                    else:
                        item_class = "%s" %('portrait')
                except:
                    return item_class
        elif item.hasMedia:
            image = uuidToCatalogBrain(item.leadMedia)
            if image:
                image_obj = image.getObject()
                if getattr(image_obj, 'image', None):
                    try:
                        w, h = image_obj.image.getImageSize()
                        if w > h:
                            item_class = "%s" %('landscape')
                        else:
                            item_class = "%s" %('portrait')
                    except:
                        return item_class

        return item_class

    def getImageProperties(self, item):
        link = item.getURL()+"/view"
        title = item.Title
        description = item.Description

        try:
            if item.portal_type == "Image":
                image = item.getObject()
                parent = image.aq_parent
                if parent.portal_type == "Folder":
                    if parent.id == "slideshow":
                        obj = parent.aq_parent
                        if obj.portal_type == "Object":
                            title = obj.title
                            description = obj.description
                            link = obj.absolute_url()

        except:
            raise

        return {"link": link, "title": title, "description": description}

    def pairItems(self, results):
        # L P L L L P P P
        TEST_INPUT = ["L", "P", "L", "L", "L", "P", "P", "P"]
        FIRST_ITEM = 0
        
        items = results
        sequence_items = items._sequence
        total_items = len(sequence_items)
        items_checked = []
        final_patterns = []

        right = True
        previous_pair = ""

        for i in range(total_items):

            if i not in items_checked:

                right_pattern = "right" if right else "left"
                pattern = {
                    "size": "small",
                    "orientation": self.find_orientation(sequence_items[i]),
                    "position": "pair",
                    "clearfix": False,
                    "item": sequence_items[i],
                    "right": right_pattern,
                    "bottom": ""
                }
               
                if i == FIRST_ITEM:
                    pattern['position'] = "single"
                    pattern['size'] = "big"
                    final_patterns.append(pattern)
                    items_checked.append(i)
                    if right:
                        right = False
                    else:
                        right = True
                else:
                    if i+1 < total_items:
                        next_orientation = self.find_orientation(sequence_items[i+1])

                        if next_orientation == pattern["orientation"] == "landscape":
                            pattern["position"] = "single"
                            pattern["size"] = "big"
                            final_patterns.append(pattern)
                            if right:
                                right = False
                            else:
                                right = True

                            previous_pair = ""
                        else:
                            new_pattern = {
                                "size": pattern['size'],
                                "orientation": pattern['orientation'],
                                "position": "pair",
                                "clearfix": True,
                                "item": sequence_items[i+1],
                                "right": pattern['right'],
                                "bottom": pattern['bottom']
                            }
                            new_pattern["orientation"] = next_orientation

                            if next_orientation == pattern['orientation'] == "portrait":
                                pattern['size'] = "big"
                                new_pattern['size'] = "big"

                            if not previous_pair:
                                if right:
                                    pattern['bottom'] = "bottom"
                                    new_pattern['bottom'] = "up"
                                else:
                                    new_pattern['bottom'] = "bottom"
                                    pattern['bottom'] = "up"
                            else:
                                if previous_pair == "bottom":
                                    pattern['bottom'] = "up"
                                    new_pattern['bottom'] = "bottom"
                                    previous_pair = "bottom"
                                else:
                                    pattern['bottom'] = "bottom"
                                    new_pattern['bottom'] = "up"
                                    previous_pair = "up"

                            final_patterns.append(pattern)
                            final_patterns.append(new_pattern)
                            items_checked.append(i)
                            items_checked.append(i+1)
                    else:
                        pattern['position'] = "single"
                        pattern['size'] = "big"
                        final_patterns.append(pattern)
            else:
                pass

        return final_patterns


    def getImageObject(self, item):
        if item.portal_type == "Image":
            return item.getURL()+"/@@images/image/large"
        if item.leadMedia != None:
            uuid = item.leadMedia
            media_object = uuidToCatalogBrain(uuid)
            if media_object:
                return media_object.getURL()+"/@@images/image/large"
            else:
                return None
        else:
            return None

    def getImageClass(self, item, has_media=False):

        item_class = "entry"

        if item.portal_type == "Image":
            image_obj = item.getObject()
            if getattr(image_obj, 'image', None):
                try:
                    w, h = image_obj.image.getImageSize()
                    if w > h:
                        item_class = "%s %s" %(item_class, 'landscape')
                    else:
                        item_class = "%s %s" %(item_class, 'portrait')
                except:
                    return item_class
        elif has_media:
            image = uuidToCatalogBrain(item.leadMedia)
            image_obj = image.getObject()
            if getattr(image_obj, 'image', None):
                try:
                    w, h = image_obj.image.getImageSize()
                    if w > h:
                        item_class = "%s %s" %(item_class, 'landscape')
                    else:
                        item_class = "%s %s" %(item_class, 'portrait')
                except:
                    return item_class

        return item_class


class FullScreenCollectionView(CollectionView):

    def getLeadMediaURL(self, item, scale="large"):
        if item.portal_type == "Image":
            url = item.getURL()
            if url:
                return "%s/@@images/image/%s" %(item.getURL(), scale)
            else:
                return None
        if item.leadMedia != None:
            media_object = uuidToCatalogBrain(item.leadMedia)
            if media_object:
                return "%s/@@images/image/%s" %(media_object.getURL(), scale)
            else:
                return None
        return None

class InfiniteCollectionView(CollectionView):
    pass



class CustomEventEventListing(EventEventListing):
    def getLeadMedia(self, brain):
            
        acc_context = brain.context
        lead_obj = acc_context
        if getattr(acc_context, 'portal_type', None) == "Occurrence":
            lead_obj = aq_parent(aq_inner(acc_context))

        item = uuidToCatalogBrain(lead_obj.UID())

        if item.portal_type == "Image":
            return item.getURL()+"/@@images/image/mini"
        
        if item.leadMedia != None:
            uuid = item.leadMedia
            media_object = uuidToCatalogBrain(uuid)
            if media_object:
                return media_object.getURL()+"/@@images/image/mini"
            else:
                return None
        else:
            return None

        return ""

class CustomEventListing(EventListing):
    def getLeadMedia(self, brain):
            
        acc_context = brain.context
        lead_obj = acc_context
        if getattr(acc_context, 'portal_type', None) == "Occurrence":
            lead_obj = aq_parent(aq_inner(acc_context))

        item = uuidToCatalogBrain(lead_obj.UID())

        if item.portal_type == "Image":
            return item.getURL()+"/@@images/image/mini"
        
        if item.leadMedia != None:
            uuid = item.leadMedia
            media_object = uuidToCatalogBrain(uuid)
            if media_object:
                return media_object.getURL()+"/@@images/image/mini"
            else:
                return None
        else:
            return None

        return ""


class CustomEventListingIcal(EventListingIcal):
    pass


def objectTranslated(ob, event):
    if ob:
        if ITranslatable.providedBy(ob):
            if getattr(ob, 'language', None) == "en" and getattr(ob, 'portal_type', None) in ["Document", "Event", "News Item"] and getattr(ob, 'id', '') not in ['slideshow']:
                createdEvent(ob, event)
                
                if not hasattr(ob, 'slideshow'):
                    if ITranslationManager(ob).has_translation('nl'):
                        original_ob = ITranslationManager(ob).get_translation('nl')

                        if hasattr(original_ob, 'slideshow'):
                            slideshow = original_ob['slideshow']
                            ITranslationManager(slideshow).add_translation('en')
                            slideshow_trans = ITranslationManager(slideshow).get_translation('en')
                            slideshow_trans.title = slideshow.title
                            slideshow_trans.portal_workflow.doActionFor(slideshow_trans, "publish", comment="Slideshow published")

                            for sitem in slideshow:
                                if slideshow[sitem].portal_type == "Image":
                                    ITranslationManager(slideshow[sitem]).add_translation('en')
                                    trans = ITranslationManager(slideshow[sitem]).get_translation('en')
                                    trans.image = slideshow[sitem].image
                                    addCropToTranslation(slideshow[sitem], trans)

                            ob.reindexObject()
                            ob.reindexObject(idxs=["hasMedia"])
                            ob.reindexObject(idxs=["leadMedia"])
                        else:
                            # no slideshow folder
                            pass
                    else:
                        # no translation
                        pass
                else:
                    # has slideshow
                    pass
            else:
                # wrong language
                pass
    else:
        # invalid object
        pass

    return


