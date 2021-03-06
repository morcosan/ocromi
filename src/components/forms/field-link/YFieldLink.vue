<script lang="ts">
   import { Component, Override, Prop } from '../../../core/decorators';
   import YBaseInputField from '../YBaseInputField';
   import YTemplateInput from '../YTemplateInput.vue';
   import { QIcon, QInput, QTooltip } from 'quasar';
   import Regex from '../../../utils/regex';
   import Utils from '../../../utils';


   @Component({
      components: { QInput, QIcon, QTooltip, YTemplateInput },
   })
   export default class YFieldLink extends YBaseInputField {

      @Prop({ default: '' }) public value!: string;


      public nativeInput!: HTMLElement;
      public prefix: string = 'https://';
      public finalURL: string = '';


      @Override
      public get valueComputed() {
         return this.value;
      }


      @Override
      public get rulesComputed() {
         const rules = [...this.rules];

         // add required rule
         if (!this.isOptional) {
            rules.push((value: string) => (Boolean(value) || this.YLocale.all.requiredError));
         }

         // add URL rule
         rules.push((value: string) => {
            if (value) {
               return (Regex.isSimpleLink(value) || this.YLocale.fieldLink.maskError);
            }
            return true;
         });

         return rules;
      }


      public get canShowIcon() {
         return (!this.errorComputed && this.value && this.isDirty);
      }


      @Override
      public created() {
         this.initialValue = this.value;
      }


      @Override
      public mounted() {
         // @ts-ignore
         this.nativeInput = this.$refs.inputRef.$el.querySelector('.js-native-input');
         this.nativeInput?.addEventListener('paste', this.onPaste);
      }


      @Override
      public destroyed() {
         this.nativeInput?.removeEventListener('paste', this.onPaste);
      }


      public onKeyDown(event: KeyboardEvent) {
         // block space character on key down
         if (event.key === ' ') {
            event.preventDefault();
         }
      }


      public onPaste(event: ClipboardEvent) {
         // get pasted url
         const url = (event.clipboardData || (globalThis as any).clipboardData).getData('text');

         // remove http or https
         const http = 'http://';
         const https = 'https://';
         const httpIndex = url.indexOf(http);
         const httpsIndex = url.indexOf(https);
         let value = '';
         if (httpIndex > -1) {
            value = url.substr(http.length);
         }
         else if (httpsIndex > -1) {
            value = url.substr(https.length);
         }

         this.updateValueProp(value);

         // stop paste event
         event.preventDefault();
      }


      public onKeyDownButton(event: KeyboardEvent) {
         // activate button with space or enter
         if (event.key === ' ' || event.key === 'Enter') {
            event.preventDefault();

            this.openURL();
         }
      }


      public openURL() {
         if (!this.isReadonly) {
            Utils.openURL(this.finalURL);
         }
      }


      public updateFinalURL() {
         const httpOptions = ['localhost', '127.0.0.1'];

         let isHttp = false;
         for (let i = 0; i < httpOptions.length; i++) {
            if (this.value.includes(httpOptions[i])) {
               isHttp = true;
               break;
            }
         }

         this.prefix = (isHttp ? 'http://' : 'https://');
         this.finalURL = this.prefix + this.value;
      }

   }
</script>


<template>
   <YTemplateInput
      class="y-field-link"
      :is-mini="isMiniComputed"
      :is-disabled="isDisabledComputed"
      :side-label-width="sideLabelWidthComputed"
      :label="labelComputed"
      :error="errorComputed"
      :input-id="inputId"
   >
      <QInput
         :value="value"
         :label="(isMiniComputed ? labelComputed : undefined)"
         :placeholder="finalPlaceholder"
         :readonly="isReadonly"
         :disable="isDisabledComputed"
         :bg-color="bgColor"
         :error="Boolean(errorComputed)"
         :prefix="prefix"
         :for="inputId"
         type="text"
         input-class="js-native-input"
         outlined
         hide-bottom-space
         @input="updateValueProp($event)"
         @keydown="onKeyDown"
         @keyup="updateFinalURL"
         @blur="onBlur"
         ref="inputRef"
      >
         <template v-if="canShowIcon" v-slot:append>
            <a
               :href="finalURL"
               :tabindex="(isReadonly || isDisabledComputed) ? -1 : 0"
               class="y-field-link__anchor"
               @click="openURL"
               @keydown="onKeyDownButton"
            >
               <QIcon :class="(isReadonly ? 'cursor-not-allowed' : 'cursor-pointer')" name="open_in_new">
                  <QTooltip v-if="!isReadonly">{{ YLocale.fieldLink.tooltip }}</QTooltip>
               </QIcon>
            </a>
         </template>
      </QInput>


      <template v-slot:bottom-left>
         <div v-if="!errorComputed && hint">{{ hint }}</div>
      </template>

   </YTemplateInput>
</template>


<style scoped lang="scss">
   // @import '../../../css/variables';

   .y-field-link__anchor {
      display: flex;
      height: fit-content;
      width: fit-content;
   }

   .y-field-link /deep/ .q-field .q-field__prefix {
      padding: inherit;
      padding-right: 5px;
   }
</style>
