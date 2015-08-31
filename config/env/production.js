'use strict';

module.exports = {
    assets: {
        lib: {
            css: [
				'public/lib/bootstrap/dist/css/bootstrap.min.css',
				'public/lib/bootstrap/dist/css/bootstrap-theme.min.css',
                'public/lib/angular-material/angular-material.min.css'
			],
            js: [
				'public/lib/angular/angular.min.js',
				'public/lib/angular-resource/angular-resource.js',
				'public/lib/angular-animate/angular-animate.js',
				'public/lib/angular-ui-router/release/angular-ui-router.min.js',
				'public/lib/angular-ui-utils/ui-utils.min.js',
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.min.js',
				'public/lib/angular-material/angular-material.min.js',
                'public/lib/angular-aria/angular-aria.min.js'
			]
        },
        css: 'public/dist/application.min.css',
        js: 'public/dist/application.min.js'
    }
};
