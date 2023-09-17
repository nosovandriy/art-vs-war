/* eslint-disable */
// WARNING: DO NOT EDIT. This file is automatically generated by AWS Amplify. It will be overwritten.

const awsmobile = {
    "aws_project_region": "eu-west-3",
    "aws_cognito_region": "eu-west-3",
    "aws_user_pools_id": "eu-west-3_YVtTMfIf9",
    "aws_user_pools_web_client_id": "47pn7cv0415t605kff2lilahj",
    "oauth": {
        "domain": "auth.artvswar.gallery.auth.eu-west-3.amazoncognito.com",
        "scope": [
            "email",
            "openid"
        ],
        "redirectSignIn": "https://artvswar.gallery/profile",
        "redirectSignOut": "https://artvswar.gallery",
        "responseType": "code"
    },
    "federationTarget": "COGNITO_USER_POOLS",
    "aws_cognito_username_attributes": [
        "EMAIL"
    ],
    "aws_cognito_social_providers": [
        "FACEBOOK",
        "GOOGLE"
    ],
    "aws_cognito_signup_attributes": [
        "EMAIL"
    ],
    "aws_cognito_mfa_configuration": "OPTIONAL",
    "aws_cognito_mfa_types": [
        "TOTP"
    ],
    "aws_cognito_password_protection_settings": {
        "passwordPolicyMinLength": 8,
        "passwordPolicyCharacters": [
            "REQUIRES_LOWERCASE",
            "REQUIRES_UPPERCASE",
            "REQUIRES_NUMBERS",
            "REQUIRES_SYMBOLS"
        ]
    },
    "aws_cognito_verification_mechanisms": [
        "EMAIL"
    ]
};


export default awsmobile;
