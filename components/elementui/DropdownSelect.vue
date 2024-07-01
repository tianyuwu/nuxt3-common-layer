
<template>
  <el-dropdown :trigger="trigger" :teleported="true"
               max-height="300px" @command="handleCommand"
               @visible-change="onVisibleChange">
    <span :class="selectedClass" class="el-dropdown-link flex-between cp w-full outline-0">
      <slot :current="current">
        <span class="max-w-200px truncate">{{ current && current[label]   }}</span>
      </slot>
			<Icon name="ep:arrow-down" class="transition" :class="{ 'rotate-180': isVisible }"></Icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item v-for="item in options" :key="item[props.value]" :command="item[props.value]" class="fs-12">
          <slot name="option" :item="item">
            <span>{{ item[label] }}</span>
          </slot>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script setup lang="ts">
/**
 * @description 自定义下拉菜单
 * @param {string} modelValue
 * @param {Array<{label: string, value: string}>} options
 * @param {Function} onVisibleChange
 * @param {Function} handleCommand
 */
	const props = defineProps({
		modelValue: {
			type: [String, Number],
			default: null,
		},
		options: {
			type: Array as PropType<{ label?: string, value?: string, [key: string]: any }[]>,
			default: () => [],
		},
		selectedClass: {
			type: String,
			default: '',
		},
		trigger: {
			type: String as PropType<'hover' | 'click'>,
			default: 'click',
		},
		label: {
			type: String,
			default: 'label',
		},
		value: {
			type: String,
			default: 'value',
		},
	});

	const emit = defineEmits(['change', 'update:modelValue']);
	const isVisible = ref(false);

	const current = computed(() => {
		if (props.modelValue == null) {
			emit('update:modelValue', props.options[0][props.value]);
			emit('change', props.options[0][props.value]);
			return props.options[0];
		} else {
			return props.options.find(item => item[props.value] === props.modelValue);
		}
	});

	function handleCommand(command: string) {
		emit('update:modelValue', command);
		emit('change', command);
	}

	function onVisibleChange(visible: boolean) {
		isVisible.value = visible;
	}
	
</script>