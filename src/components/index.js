import SvgIcon from './svgIcon.vue';
import NoDataTips from './no-data-tips.vue';
import Rate from './rate.vue';
import LoginRegRight from './login-reg-right.vue';
import Empty from './empty.vue';

export default {
	install: Vue => {
		Vue.component(SvgIcon.name, SvgIcon);
    Vue.component(NoDataTips.name, NoDataTips);
    Vue.component(Rate.name, Rate);
    Vue.component(LoginRegRight.name, LoginRegRight);
    Vue.component(Empty.name, Empty);
	}
};
