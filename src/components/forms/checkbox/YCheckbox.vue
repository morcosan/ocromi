<script lang="ts">
   /**
    * Used inside forms (but not only) when the options are true / false
    */

   import { Component, Mixins, Prop } from 'vue-property-decorator';
   import { QCheckbox } from 'quasar';
   import YBaseInput from '../YBaseInput';


   @Component({
      components: { QCheckbox },
   })
   export default class YCheckbox extends Mixins(YBaseInput) {

      /** Content props */
      @Prop({ default: false }) public value!: boolean | null;

      /** States */
      public error: string = '';

      /** Handle value change */
      public onInput(value: boolean) {
         // check if required
         if (this.isRequired) {
            this.error = (value ? '' : this.$locale.all.required);
         }

         // change value
         this.$emit('input', value);
      }

      /**
       * Public method
       * Check value and update error
       */
      public validate() {
         // check if required
         if (this.isRequired) {
            this.error = (this.value ? '' : this.$locale.all.required);
         }
         return !this.error;
      }

      /** Focus this control */
      public focus() {
         // @ts-ignore
         this.$refs.qCheckbox.$el.focus();
      }

   }
</script>


<template>
   <div :class="{
		'y-checkbox': true,
		'y-checkbox--required': isRequired,
		'y-input-spacing': hasSpacing,
	}">
      <QCheckbox
         @input="onInput"
         :value="value"
         :disable="isDisabled"
         :color="error ? 'negative' : undefined"
         :keep-color="!!error"
         ref="qCheckbox"
      >
         <div :class="{ 'text-negative': error }">
            {{ isRequired ? ('* ' + label) : label }}
            <slot/>
         </div>
      </QCheckbox>

      <div :class="{ 'y-checkbox__error text-caption text-negative': true, 'y-checkbox__error--visible': error	}">
         {{ error }}
      </div>
   </div>
</template>


<style scoped lang="scss">
   //@import '../../../css/variables';

   .y-checkbox {
      margin-left: -10px;

      &.y-checkbox--required {
         position: relative;
         padding-bottom: 18px;
      }

      .y-checkbox__error {
         position: absolute;
         left: 0;
         bottom: 10px;

         padding-left: 12px;

         opacity: 0;
         transition: bottom 0.3s, opacity 0.3s;
         transition-timing-function: ease-out;

         &.y-checkbox__error--visible {
            bottom: 0;
            opacity: 1;
         }
      }
   }
</style>