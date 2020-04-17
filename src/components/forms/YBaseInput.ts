import { Component, Override, Prop, Vue, Watch } from '../../core/decorators';
import YBaseForm from './YBaseForm';


type FormProps = {
   isMini?: boolean;
   sideLabelWidth?: string;
}


@Component
export default class YBaseInput extends Vue {

   @Prop({ default: '' }) public label!: string;
   @Prop({ default: '' }) public error!: string;
   @Prop({ default: false, type: Boolean }) public isOptional!: boolean;
   @Prop({ default: false, type: Boolean }) public hidesOptional!: boolean;
   @Prop({ default: false, type: Boolean }) public isDisabled!: boolean;
   @Prop({ default: false, type: Boolean }) public isReadonly!: boolean;
   @Prop({ default: null, type: Boolean }) public isMini!: boolean | null;
   @Prop({ default: null }) public sideLabelWidth!: string | null;
   @Prop({ default: 'white' }) public bgColor!: string;
   @Prop({ default: () => [] }) public rules!: Function[];


   public isDirty: boolean = false;
   public innerError: string = '';
   public formProps: FormProps = {};


   @Watch('value')
   public onChange_value() {
      if (this.isDirty) {
         this.validate();
      }
   }


   @Watch('isOptional')
   public onChange_isOptional() {
      if (this.isOptional) {
         this.resetValidation();
      }
   }


   public get valueComputed(): any {
      return undefined;
   }


   public get rulesComputed() {
      return this.rules;
   }


   public get labelComputed() {
      if (this.label !== '') {
         const hasOptional = (this.isOptional && !this.hidesOptional);
         return (hasOptional ? (this.label + ' ' + this.$locale.all.optional) : this.label);
      }
      return '';
   }


   public get errorComputed() {
      return (this.error || this.innerError);
   }


   public get isMiniComputed() {
      return (this.isMini !== null ? this.isMini : this.formProps.isMini);
   }


   public get sideLabelWidthComputed() {
      return (this.sideLabelWidth !== null ? this.sideLabelWidth : this.formProps.sideLabelWidth);
   }


   @Override
   public created() {
      this.findParentForm();
   }


   public validate() {
      for (let i = 0; i < this.rulesComputed.length; i++) {
         const result: (boolean | string) = this.rulesComputed[i](this.valueComputed);
         if (result === true) {
            this.innerError = '';
         }
         else {
            this.innerError = (result as string);
            break;
         }
      }

      return !this.innerError;
   }


   public resetValidation() {
      this.isDirty = false;
      this.innerError = '';
   }


   public focus() {}


   public updateValueProp(value: any) {
      this.$emit('input', value);
   }


   public findParentForm() {
      let parent = this.$parent;
      while (parent) {
         if (parent instanceof YBaseForm) {
            parent.registerInputChild(this);
            break;
         }

         parent = parent.$parent;
      }
   }

}
