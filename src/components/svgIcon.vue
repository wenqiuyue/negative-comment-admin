<template>
	<svg
		class="icon"
		aria-hidden="true"
		:style="{ height: `${size}rem`, width: `${size}rem`, color:color }"
		@click="$emit('click')"
	>
		<use :xlink:href="`#${value}`" />
	</svg>
</template>
<script>

export default {
	name: 'svg-icon',
	props: {
		value: { type: String, default: null },
		size: { type: Number, default: 1 },
		color: { type: String, default: null }
	},
};
</script>

<style lang="less">
/*Symbol iconfont 彩色图标*/
.icon {
	fill: currentColor;
	overflow: hidden;
}
</style>
