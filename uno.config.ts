import { defineConfig, transformerDirectives, transformerVariantGroup } from 'unocss';
import basePreset from './unocss.preset';

export default defineConfig({
  presets: [basePreset],
  transformers: [transformerDirectives(), transformerVariantGroup()]
});
