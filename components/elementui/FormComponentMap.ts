import { ElSwitch, ElCascaderPanel, ElCascader, ElInputNumber, ElTimePicker } from 'element-plus'
import type { FormComponentMap } from "./types";
import Input from './Input.vue'
import NumberInput from "./NumberInput.vue";
import ArrayInput from "./ArrayInput.vue";
import BasicSelect from "./BasicSelect.vue";
import RadioSelect from "./RadioSelect.vue";
import CheckboxSelect from "./CheckboxSelect.vue";
import DatePicker from './DatePicker.vue';
import DateTimePicker from './DateTimePicker.vue';

export const formComponentMap: FormComponentMap = {
  Input: Input,
  NumberInput: NumberInput,
  ArrayInput: ArrayInput,
  Switch: ElSwitch,
  Select: BasicSelect,
  RadioSelect: RadioSelect,
  Checkbox: CheckboxSelect,
  Cascader: ElCascader,
  CascaderPanel: ElCascaderPanel,
  InputNumber: ElInputNumber,
  // ImageUpload: ImageUploader,
  DatePicker: DatePicker,
  DateTimePicker: DateTimePicker,
  // FullText: Tinymce,
  // SimpleFullText: WangEditor,
  TimePicker: ElTimePicker,
  // FileUpload: FileUpload,
  // JsonEditor: JsonEditor,
  // JsonEditorPop: JsonEditorPop,
}
