# -*- coding: utf-8 -*-
################################################################################
#
#    Bashalog
#
#    Copyright (C) 2023-TODAY Bashalog(<https://bashalog.com>).
#    Author: Ibad Ahmed (info@bashalog.com)
#
#    You can modify it under the terms of the GNU AFFERO
#    GENERAL PUBLIC LICENSE (AGPL v3), Version 3.
#
#    This program is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    GNU AFFERO GENERAL PUBLIC LICENSE (AGPL v3) for more details.
#
#    You should have received a copy of the GNU AFFERO GENERAL PUBLIC LICENSE
#    (AGPL v3) along with this program.
################################################################################
{
    'name': 'Voice Message In Odoo with Delete Option',
    'version': '15.0.1.1.0',
    'category': 'Discuss',
    'summary': 'Send and delete voice messages in Chatter.',
    'description': """
This module provides an option to record voice and send voice messages in Chatter.
It also includes a delete button for each voice message, allowing users to remove their voice notes.
    """,
    'author': 'Bashalog',
    'company': 'Bashalog',
    'maintainer': 'Bashalog',
    'website': 'https://bashalog.com',
    'depends': ['base', 'mail'],
    'assets': {
        'web.assets_qweb': [
            '/voice_note_in_chatter/static/src/xml/voice_in_odoo.xml',
        ],
        'web.assets_backend': [
            'voice_note_in_chatter/static/src/js/record_voice_component.js',
            'voice_note_in_chatter/static/src/js/voice_in_odoo.js',
            'voice_note_in_chatter/static/src/js/record_voice_model.js',
            'voice_note_in_chatter/static/src/js/attachment_card.js',
        ]
    },
    'images': ['static/description/banner.jpg'],
    'license': 'AGPL-3',
    'installable': True,
    'auto_install': False,
    'application': False,
}
