<template>
  <div>
    <ClientOnly>
      <QuillEditor
        ref="editorRef"
        v-model:content="content"
        theme="snow"
        :toolbar="toolbar"
        :modules="modules"
        content-type="html"
        placeholder="Please input..."
        @text-change="handleTextChange"
      />
    </ClientOnly>
  </div>

</template>

<script lang="ts" setup>
	import '@vueup/vue-quill/dist/vue-quill.snow.css';
	import 'quill-image-uploader/dist/quill.imageUploader.min.css';
	import { QuillEditor } from '@vueup/vue-quill';
	import ImageUploader from 'quill-image-uploader';
	import { useVModel } from '@vueuse/core';

	const props = defineProps({
		modelValue: {
			type: String,
			default: ''
		},
    uploadMethod: {
      type: Function,
      default: () => {}
    }
	});

	const emit = defineEmits(['update:modelValue']);
	const editorRef = ref<any>(null);
	const content = useVModel(props, 'modelValue', emit);

	watch(() => props.modelValue, (v) => {
		if (v !== editorRef.value.getContents()) {
			editorRef.value.setContents(v);
		}
	});

	const toolbar = [
		['bold', 'italic', 'underline', 'strike'],
		[{ list: 'ordered' }, { list: 'bullet' }],
		['link', 'image']
	];

	const modules = {
		name: 'imageUploader',
		module: ImageUploader,
		options: {
			upload: (file: any) => {
				const maxsize = 1024 * 1024;// 1M

				return new Promise((resolve, reject) => {
					if (file.size > maxsize) {
						ElMessage('File size exceeds 1M limit');
						reject('File size exceeds 1M limit');
					}
					const formData = new FormData();
					formData.append('file', file);
					// post({
					// 	url: '/api/upload/img',
					// 	data: formData,
					// 	headers: {
					// 		'Content-Type': 'application/x-www-form-urlencoded'
					// 	}
					// }).then((res: any) => {
          props.uploadMethod().then((res: any) => {
						console.log(res);
						resolve(res.url);
					}).catch((err) => {
						console.error('Upload failed Error:', err);
					});
				});
			}
		}
	};

	const handleTextChange = () => {
		const limit = 5000;
		const quill = editorRef.value?.getQuill();
		if (quill && quill.getLength() > limit) {
			const currentLength = quill.getLength();
			// More than 5000 characters cannot continue to enter
			quill.deleteText(limit, currentLength);
			setTimeout(() => {
				quill.setSelection(currentLength, currentLength);
			}, 2);
		}
	};
</script>
