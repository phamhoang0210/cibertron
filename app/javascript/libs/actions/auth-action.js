import actionRequests from './../requests/authRequest';

//function is processing, success, failse
function setIsProcessing(actionstype, payload = {}) {
	return {
		type: `${actionstype}_PROCESS`,
		payload,
	};
}
function processSuccess(actionstype, payload = {}){
	return {
		type: `${actionstype}_SUCCESS`,
		payload,
	}
}
function processFailse(actionstype, error) {
	return {
		type: `${actionstype}_FAILSE`,
    error,
	};
}

// == Begin action
//fetchRecords -GET entity_name
export function fetchRecords(dispatch, actionstype, url, params, options) {
	options = Object.assign({}, {
		successcallback: () => {},
		context: {}
	}, options);

	dispatch(setIsProcessing(actionstype, params));

	return (
		actionRequests
			.fetchEntities(url, {...params, ...(options.context || {})})
			.then(res => {
				dispatch(processSuccess(actionstype, res.data));
			})
			.catch(error => {
				dispatch(processFailse(actionstype, error));
			})
	);
}

//fetchRecord - GET entity_name/1
export function fetchRecord(dispatch, actionstype, url, id, options) {
	options = Object.assign({}, {
		successcallback: () => {},
		context: {},
		params: {},
	}, options);

	dispatch(setIsProcessing(actionstype));

	return (
		actionRequests
		 .fetchEntity(url, {...(options.params || {}), ...(options.context || {})})
		 .then(res => {
		 		dispatch(processSuccess(actionstype, res.data, id));
		 		options.successcallback(res);
		 })
		 .catch(error => {
		 	 dispatch(processFailse(actionstype, error));
		 })
	);
}

//submitRecord -POST entity_name
export function submitRecord(dispatch, actionstype, url, entity, options){
	options = Object.assign({}, {
		successcallback: () => {},
		context: {}
	},options);

	dispatch(setIsProcessing(actionstype, entity));

	return(
		actionRequests
		.submitEntity(url, {...entity, ...(options.context || {})})
		.then(res => {
			dispatch(processSuccess(actionstype, res.data));
			options.successcallback(res);
		})
		.catch(error => {
			dispatch(processFailse(actionstype, error));
		})
	);
}

//uploadRecord - POST entity_name
export function uploadRecord(dispatch, actionstype, url, entity, options){
	options = Object.assign({}, {
		successcallback: () => {},
		context: {}
	}, options);

	dispatch(setIsProcessing(actionstype, entity));

	return(
		actionRequests
			.uploadEntity(url, {...entity, ...(options.context || {})})
			.then(res => {
				dispatch(processSuccess(actionstype, res.data));
				options.successcallback(res);
			})
			.catch(error => {
				dispatch(processFailse(actionstype, error));
			})
	);
}

//updateRecord -PUT entity_name
export function updateRecord(dispatch, actionstype, url, entity, options){
	options = Object.assign({}, {
		successcallback: () => {},
		failsecallback: () => {},
		context: {}
	}, options);

	dispatch(setIsProcessing(actionstype, entity));

	return(
		actionRequests
			.patchEntity(url, {...entity, ...(options.context || {})})
			.then(res => {
				dispatch(processSuccess(actionstype, res.data));
				options.successcallback(res);
			})
			.catch(error => {
				dispatch(processFailse(actionstype, error));
				options.failsecallback(entity);
			})
	);
}

//deleteRecord -DELETE entitty_name/1
export function deleteRecord(dispatch, actionstype, url, id, options){
 	options = Object.assign({}, {
		successcallback: () => {},
		context: {}
	}, options);

	dispatch(setIsProcessing(actionstype, id));

	return (
		actionRequests
			.deleteEntity(url, {...(options.context || {})})
			.then(res => {
				dispatch(processSuccess(actionstype, res.data));
				options.successcallback(res);
			})
			.catch(error => {
				dispatch(processFailse(actionstype, error));
			})
	);
}

// END Hoangpv