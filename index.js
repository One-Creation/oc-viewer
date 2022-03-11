module.exports = function ocViewer(config) {
    let defaultConfig = {
        entryPoint: null,
        authToken: null,
        contributionId: null,
        policyId: null,
    }

    const errorMessages = {
        policyId: 'Policy id is mandatory.',
        entryPoint: 'No entry point has been provided.',
        authToken: 'No authentication token has been provided.',
        contributionId: 'No contribution id has been provided.',
    }

    config = {...defaultConfig, ...config};
    const url = 'https://mvp.one-creation.com/oc-viewer';
    let iframe = null;
    let src = null;
    let elem = null;
    let meetRequirements = false;

    
    this.setAuthToken = (token) => {
        updateConfig({authToken: token});
        updateIframeSrc();
        return this;
    }
    
    this.setConfig = (newConfig) => {
        config = {...config, ...newConfig};
        updateIframeSrc();
        return this;
    }

    this.setContributionId = (contributionId) => {
        updateConfig({contributionId});
        updateIframeSrc();
        return this;
    }

    this.setEntryPoint = (entryPoint) => {
        updateConfig({entryPoint});
        updateIframeSrc();
        return this;
    }

    this.setPolicyId = (policyId) => {
        updateConfig({policyId});
        updateIframeSrc();
        return this;
    }

    const appendElement = () => {
        elem.appendChild(iframe);
    }

    const checkRequirements = () => {
        let label = '';
        meetRequirements = true;

        Object.keys(config).forEach(key => {
            if(!config[key]) {
                meetRequirements = false;
                label = label ? `${label} \n ${errorMessages[key]}` : errorMessages[key];
            }
        });

        if(!meetRequirements) {
            console.warn(`Unable to append the iframe, the following propierties are mandatory: \n ${label}`);
        }
    }

    const foundIframe = () => {
        return elem ? elem.querySelector('iframe') : false;
    }

    const init = () => {
        checkRequirements();
        setSrc();
        setIframe();
        setElement();
        if(meetRequirements) {
            appendElement();
        }
        return this;

    }

    const setIframe = () => {
        iframe = document.createElement('iframe');
        iframe.setAttribute("style","height:100%;width:100%;");
        iframe.setAttribute('src', src);
        iframe.onload = function() {
            window.frames[0].postMessage({'authToken': config.authToken}, this.src);
        }
    }

    const setElement = () => {
        elem = document.querySelector(config.entryPoint);
        if(!elem) {
            console.warn('No element has been found with the provided entry point.');
        }
    }

    const setSrc = () => {
        src = `${url}/${config.policyId}/${config.contributionId}`;
    }

    const updateConfig = (newConfig) => {
        config = {...config, ...newConfig};
        checkRequirements();
    }

    const updateIframeSrc = () => {        
        setSrc();
        iframe.setAttribute('src', src);        
        if(meetRequirements && !foundIframe()) {
            setElement();
            appendElement();
        }
    }

    init();
}

