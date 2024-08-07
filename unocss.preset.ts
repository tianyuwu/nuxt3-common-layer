import { definePreset, presetUno, presetAttributify } from 'unocss';

export default definePreset({
  name: 'uno-base-preset',
  presets: [
    presetUno(),
    presetAttributify(),
  ],
  shortcuts: [
    {
      'flex-center': 'flex items-center justify-center',
      'flex-between': 'flex items-center justify-between',
      'flex-column-center': 'flex items-center flex-col',
      'flex-column-between': 'flex justify-between flex-col',
    },
  ],
  rules: [
    [/(\w)-calc-(\d+(\.?\d+)?)$/, match => {
      const key = match[1] === 'w' ? 'width' : 'height';
      const value = match[2];
      const isMax = match.input?.includes('max');
      return {
        [isMax ? `max-${key}` : key] : `calc(100% - ${value}px)`
      };
    }],
    [/box-(\d+(\.?\d+)?)$/, match => {
      const value = match[1];
      return {
         width: `${value}px`,
         height: `${value}px`,
         display: 'flex',
         'justify-content': 'center',
         'align-items': 'center'
      };
    }],
  ],
});
