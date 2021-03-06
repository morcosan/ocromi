import { Component, Override, Prop, Watch } from '../../core/decorators';
import YBaseInput from './YBaseInput';


export type Option = {
   value: string,
   label: string,
}


type Target = (HTMLElement | null);


@Component
export default class YBaseInputGroup extends YBaseInput {

   @Prop({ default: () => [] }) public options!: Option[];


   public currOptionIndex: number = 0;


   @Watch('isReadonly')
   public onChange_isReadonly() {
      if (this.isReadonly) {
         this.disableCurrOption();
      }
      else {
         this.enableCurrOption();
      }
   }


   public get qOptionGroupChildren() {
      // compute HTML list of group's children
      if (this.$refs.inputRef) {
         // @ts-ignore
         return this.$refs.inputRef.$el.children;
      }

      return [];
   }


   @Override
   public focus() {
      if (this.qOptionGroupChildren[0]) {
         const firstChild = this.qOptionGroupChildren[0].children[0];
         if (firstChild) {
            firstChild.focus();
         }
      }
   }


   @Override
   public mounted() {
      // make the options readonly
      [...this.qOptionGroupChildren].forEach((elem: HTMLElement) => {
         const target: Target = elem.querySelector('[tabindex]');
         if (target) {
            // disable option
            target.setAttribute('tabindex', '-1');
         }
      });

      if (!this.isReadonly && !this.isDisabled) {
         this.enableCurrOption();
      }
   }


   public onKeyDown(event: KeyboardEvent) {
      if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
         event.preventDefault();
         this.navigateDown();
      }
      else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
         event.preventDefault();
         this.navigateUp();
      }

      this.focusCurrOption();
   }


   private navigateDown() {
      this.disableCurrOption();
      this.currOptionIndex = (this.currOptionIndex + 1) % this.options.length;
      this.enableCurrOption();
   }


   private navigateUp() {
      this.disableCurrOption();
      this.currOptionIndex = (this.options.length + this.currOptionIndex - 1) % this.options.length;
      this.enableCurrOption();
   }


   private enableCurrOption() {
      const target: Target = this.getTarget(this.currOptionIndex);
      target?.setAttribute('tabindex', '0');
   }


   private disableCurrOption() {
      const target: Target = this.getTarget(this.currOptionIndex);
      target?.setAttribute('tabindex', '-1');
   }


   private focusCurrOption() {
      const target: Target = this.getTarget(this.currOptionIndex);
      target?.focus();
   }


   private getTarget(index: number) {
      const elem: (HTMLElement | undefined) = this.qOptionGroupChildren[index];
      const target: (Target | undefined) = elem?.querySelector('[tabindex]');
      return (target ? target : null);
   }

}
