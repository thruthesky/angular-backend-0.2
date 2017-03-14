export interface REQUEST {
    route?: string;
    session_id?: string;
};
export interface RESPONSE {
    code: number;
    message?: string;
};

export interface ID_PASSWORD {
    id?: string;
    password?: string;
};

/**
 * 'user' table data except 'id, 'password'.
 */
export interface USER_FIELDS {
    id?: string;
    password?: string;
    name?: string;
    nickname?: string;
    email?: string;
    mobile?: string;
    landline?: string;
    gender?: string;
    birthday?: string;
    birth_day?: string;
    birth_month?: string;
    birth_year?: string;
    country?: string;
    province?: string;
    city?: string;
    address?: string;
    zipcode?: string;
    stamp_last_login?: number;
    stamp_registration?: number;
    session_id?: string;
    meta?: any;
};



export interface SESSION_INFO {
    session_id: string;
    id: string;
    name: string;
    email: string;
};

export interface USER_SESSION_RESPONSE extends RESPONSE {
    data: SESSION_INFO
};



/**
 *
 * This is identical of 'user' table.
 */
export interface USER extends USER_FIELDS {}; // user data table.



export interface USER_DATA extends REQUEST {
  id?: string; // for admin request
}; // use it to get user data.
export interface USER_DATA_RESPONSE extends RESPONSE {                   // to get response of USER_DATA
    data: {
        user: USER;
    }
};



export interface USER_LIST extends REQUEST {
    from?: number;
    limit?: number;
    where?: string;
    bind?: string;
    order?: string;
};
export interface USER_LIST_RESPONSE extends RESPONSE {                       // array of users for user.list request
    data: {
        users: Array<USER>
        total?: string;
    }
};

export interface USER_REGISTER extends REQUEST, USER {      // to register
    meta?: any;
};

export type USER_REGISTER_RESPONSE = USER_SESSION_RESPONSE;              // to get response of USER_EDIT


export interface USER_EDIT extends REQUEST, USER_FIELDS {}; // to edit user data

export interface USER_EDIT_RESPONSE extends USER_SESSION_RESPONSE {}; // to get response of user edit. it is only session info and name, email, id.

export interface USER_META_REQUEST  extends REQUEST {};
export interface USER_META_RESPONSE extends RESPONSE {};


export interface USER_LOGIN extends REQUEST, ID_PASSWORD {};        // to login
export type USER_LOGIN_RESPONSE = USER_SESSION_RESPONSE;              // to get response of USER_LOGIN


export interface USER_LOGOUT extends REQUEST {};            // to log out. use 'RESPONSE' for the response.
export interface USER_LOGOUT_RESPONSE extends REQUEST {};


export interface ADMIN_USER_SEARCH_REQUEST extends REQUEST {        // for admin, to search user.
    cond?: string;
    page: number;
    limit: number;
};

export interface ADMIN_USER_SEARCH_RESPONS extends RESPONSE {

};




////FORUM////

interface FORUM_IDX {
    idx?: number;
};
type CONFIG_IDX= FORUM_IDX;
type POST_IDX = FORUM_IDX;

export interface POST {
    idx?: number;
    idx_config?: number;
    idx_user: number;
    title: string;
    content: string;
};


/**
 * 'FORUM CONFIG' table
 */

export interface CONFIG {
    idx?: number;
    id: string;
    name?: string;
    description?: string;
    level_list?: number;
    level_view?: number;
    level_write?: number;
    level_comment?: number;
};



export interface CONFIG_CREATE extends REQUEST, CONFIG {};               // to create a forum.
export interface CONFIG_CREATE_RESPONSE extends RESPONSE {
    data: {
        idx: number;
    }
}
export interface CONFIG_EDIT extends REQUEST, CONFIG {};    // to update a forum.
export interface CONFIG_DELETE extends REQUEST, FORUM_IDX {};                         // to delete a forum.
export interface CONFIG_GET extends REQUEST, CONFIG_IDX {};                     // to get a forum config fields.
export interface CONFIG_RESPONSE extends RESPONSE {
    data: CONFIG
};                     // to receive a complete forum config fields. Use this after create/update/get/delete a forum


export interface POST_CREATE extends REQUEST, POST {};               // to create a post
export interface POST_EDIT extends REQUEST, POST {};    // to update a post
export interface POST_DELETE extends REQUEST, POST_IDX {};                                         // to update a post
export interface POST_GET extends REQUEST, POST_IDX {};
export interface POST_RESPONSE extends RESPONSE {
    data: {
        POST_IDX,
        CONFIG_IDX,
        POST_FIELDS
    }
};           // to create/update/get/delete a post.


export interface POSTS extends RESPONSE {
    posts: Array<{
        POST_IDX,
        POST_CONFIG,
        POST_FIELDS
    }>
};



