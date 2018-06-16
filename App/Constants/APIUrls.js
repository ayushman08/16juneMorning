const BASE_URL = 'http://52.34.207.5:5032/';
const URL = 'http://52.34.207.5:5095';
const CHAT_CONNECTION_URL='http://52.34.207.5:5094';
//const BASE_URL = 'http://172.10.56.36:5095/api/';//ankur
//const BASE_URL = 'http://172.10.55.104:5095/api/';//LL


const API = {

	SIGNUP_USER							: 	BASE_URL + 'api/signup',
	BRANDS_LIST							:	BASE_URL + 'api/getBrand',
	GET_SIZES							:   BASE_URL + 'api/getSize',
	GET_STYLE_LIST						:   BASE_URL + 'api/getStyle',
	GET_STYLE_BOX_LIST					:   BASE_URL + 'api/getcustomerlastorder',
	IMAGE_BASE_USR						: 	BASE_URL,
	LOGIN_USER							: 	BASE_URL + 'api/login',
	GET_PROFILE      					:   BASE_URL + 'api/getuserProfile/',
	GET_LAST_BOX      					:   BASE_URL + 'api/getLastbox/',
	UPDATE_AVATAR      					:   BASE_URL + 'api/updateUserAvtar',
	CARD_CHECK      					:   BASE_URL + 'api/verifycard',


	

}

export default API