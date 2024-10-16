/** @odoo-module **/
import {
    registerInstancePatchModel,
    registerFieldPatchModel,
    registry
} from '@mail/model/model_core';
import Dialog from "web.Dialog";
const {
    _t
} = require('web.core');
const composer_view = registry['mail.composer_view']
import {
    one2one
} from '@mail/model/model_field';
var flag = false;
var recorder, gumStream;
registerInstancePatchModel('mail.composer_view', 'mail/static/src/models/composer_view/composer_view.js', {
    recordVoice: function() {
        //Check security of site
        /**
         * Asks for access to the user's microphone if not granted yet, then
         * starts recording.
         */
        var self = this;
        if (recorder && recorder.state == "recording") {
            recorder.stop();
            gumStream.getAudioTracks()[0].stop();
            if (this.el.children.length >= 4) {
                const targetElement = this.el.children[2]?.children[1]?.children[0]?.children[1]?.children[1];
                if (targetElement) {
                    targetElement.style.color = "";
                    targetElement.style.background = "";
                }
            } else {
                const targetElement = this.el.children[1]?.children[1]?.children[0]?.children[1]?.children[1];
                if (targetElement) {
                    targetElement.style.color = "";
                    targetElement.style.background = "";
                }
            }
        } else {
            // Precaution: Check if children elements exist before manipulating the style
            if (this.el.children.length >= 4) {
                const targetElement = this.el.children[2]?.children[1]?.children[0]?.children[1]?.children[1];
                if (targetElement) {
                    targetElement.style.color = "#008000";
                    targetElement.style.background = "#b5f1b5";
                }
            } else {
                const targetElement = this.el.children[1]?.children[1]?.children[0]?.children[1]?.children[1];
                if (targetElement) {
                    targetElement.style.color = "#008000";
                    targetElement.style.background = "#b5f1b5";
                }
            }
            var audioElements = $('.o_attachment_audio');
            //Pause Audio When Recording a new Audio
            audioElements.each(function(index, element) {
                for (let i = 0; i < element.children.length; i++) {
                    const childElement = element.children[i];
                    childElement.pause()
                }
            });
            navigator.mediaDevices.getUserMedia({
                audio: true
            }).then((stream) => {
                gumStream = stream;
                recorder = new MediaRecorder(stream);
                recorder.ondataavailable = async function(event) {
                    var reader = new FileReader();
                    reader.readAsDataURL(event.data);
                    reader.onloadend = async function() {
                        var data = reader.result;
                        var fl = [];
                        var array = data.split(','),
                            mime = array[0].match(/:(.*?);/)[1],
                            bstr = atob(array[1]),
                            n = bstr.length,
                            u8arr = new Uint8Array(n);
                        while (n--) {
                            u8arr[n] = bstr.charCodeAt(n);
                        }
                        var voice_file = new File([u8arr], 'message.mp3', {
                            type: mime
                        });
                        fl.push(voice_file);
                        await self._fileUploaderRef.comp.uploadFiles(fl)
                    };
                };
                recorder.start();
            }).catch((err) => {
                        this.env.services['notification'].notify({
                        message: this.env._t(err),
                        type: 'danger',
                    });
                });
        }
    },
});

/**
 * Registers a field patch model for the 'mail.attachment' model.
 */
registerFieldPatchModel('mail.attachment', 'mail/static/src/models/attachment/attachment.js', {
    attachment: one2one('mail.attachmentAudio', {
        inverse: 'attachment',
        isCausal: true,
    }),
});