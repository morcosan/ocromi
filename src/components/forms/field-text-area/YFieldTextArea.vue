<script lang="ts">
   /**
    * Used when user needs to enter multiple lines of text.
    */

   import { Component, Mixins, Prop } from 'vue-property-decorator';
   import YBaseInputField from '../YBaseInputField';
   import { QInput } from 'quasar';


   @Component({
      components: { QInput },
   })
   export default class YFieldTextArea extends Mixins(YBaseInputField) {

      /** Content props */
      @Prop({ default: '' }) public value!: string;
      @Prop({ default: false, type: Boolean }) public isDynamic!: boolean;

      /** States */
      public hasScrollbar: boolean = false;
      public nativeElem: (HTMLElement | null) = null;

      /** Compute validation rules */
      public get finalRules() {
         const rules = [...this.rules];
         // add required rule
         if (this.isRequired) {
            rules.push((value: string) => (!!value || this.$locale.all.requiredField));
         }
         return rules;
      }

      /** Handle input changes */
      public onInput(event: string) {
         // check if scrollbar is active
         if (this.nativeElem) {
            this.hasScrollbar = (this.nativeElem.clientHeight < this.nativeElem.scrollHeight);
         }

         // emit event
         this.$emit('input', event);
      }

      /** Capture reference to native element on focus */
      public onFocus(event: Event) {
         this.nativeElem = (event.target as HTMLElement);
      }

   }
</script>


<template>
   <QInput
      @input="onInput"
      @focus="onFocus"
      :value="value"
      :label="finalLabel"
      :hint="hint"
      :placeholder="placeholder"
      :readonly="isReadonly"
      :bg-color="bgColor"
      :error-message="error"
      :error="error !== ''"
      :rules="finalRules"
      :autogrow="isDynamic"
      :class="{
         'y-field-text-area': true,
         'y-field-text-area--has-scrollbar': hasScrollbar,
         'y-input-spacing': hasSpacing
      }"
      :disable="isDisabled"
      type="textarea"
      ref="qField"
      outlined
      lazy-rules
   />
</template>


<style scoped lang="scss">
   // @import '../../../css/variables';
</style>