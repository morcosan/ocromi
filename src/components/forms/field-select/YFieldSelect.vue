<script lang="ts">
   import { Component, Override, Prop } from '../../../core/decorators';
   import YBaseInputSelect, { Option } from '../YBaseInputSelect';
   import YTemplateInput from '../YTemplateInput.vue';
   import { QSelect } from 'quasar';


   @Component({
      components: { QSelect, YTemplateInput },
   })
   export default class YFieldSelect extends YBaseInputSelect {

      @Prop({ default: null }) public value!: Option | null;


      @Override
      public get valueComputed() {
         return this.value;
      }


      @Override
      public get rulesComputed() {
         const rules = [];

         // add required rule
         if (!this.isOptional) {
            rules.push((value: Option | null) => (Boolean(value) || this.YLocale.all.requiredError));
         }

         return rules;
      }


      @Override
      public created() {
         this.initialValue = this.value;
      }


      public onInput(value: Option) {
         this.isDirty = true;
         this.updateValueProp(value);
      }

   }
</script>


<template>
   <YTemplateInput
      :class="{ 'y-base-select y-field-select': true, 'is-menu-active': isMenuActive }"
      :is-mini="isMiniComputed"
      :is-disabled="isDisabledComputed"
      :side-label-width="sideLabelWidthComputed"
      :label="labelComputed"
      :error="errorComputed"
      :input-id="inputId"
   >
      <QSelect
         :value="value"
         :options="currOptions"
         :label="(isMiniComputed ? labelComputed : undefined)"
         :readonly="isReadonly"
         :disable="isDisabledComputed"
         :error="Boolean(errorComputed)"
         :bg-color="bgColor"
         :for="inputId"
         input-debounce="0"
         outlined
         lazy-rules
         clearable
         use-input
         hide-bottom-space
         hide-dropdown-icon
         @input="onInput"
         @blur="onBlur"
         @filter="onFilterInput"
         @popup-show="isMenuActive = true"
         @popup-hide="isMenuActive = false"
         ref="inputRef"
      >
         <template v-slot:append>
            <QIcon class="y-base-select__icon" name="arrow_drop_down"/>
         </template>
      </QSelect>


      <template v-slot:bottom-left>
         <div v-if="!errorComputed && hint">{{ hint }}</div>
      </template>

   </YTemplateInput>
</template>


<style scoped lang="scss">
   // @import '../../../css/variables';
</style>
