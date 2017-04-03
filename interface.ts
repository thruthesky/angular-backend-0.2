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

interface IDX {
    idx?: number;
};
interface ID {
    id?: string;
};
interface FILE_HOOKS {
    file_hooks?: Array<number>
};

export interface DELETE_REQUEST extends REQUEST, IDX, ID {}; // universal. all kinds of delete requst.
export interface DATA_REQUEST extends REQUEST, IDX, ID {};
export interface DELETE_RESPONSE extends RESPONSE, IDX, ID {}; // universal. all kinds of delete response.
export interface EDIT_RESPONSE extends RESPONSE, IDX, ID {};


interface USER_EDITABLE_FIELDS {
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
    meta?: METAS;
}

interface USER_REGISTABLE_FIELDS extends USER_EDITABLE_FIELDS {
    id?: string;
}
/**
 * 'user' table data except 'id, 'password'.
 */
export interface USER_FIELDS extends USER_EDITABLE_FIELDS {
    idx?: number;
    id?: string;
    readonly primary_photo_idx?: number;
};



export interface SESSION_INFO {
    session_id: string;
    id: string;
    idx: number;
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



export interface LIST extends REQUEST {
    select?: string;
    from?: number;
    where?: string;
    bind?: string;
    order?: string;
    limit?: number;
    extra?: any;
    page?: number;
};

export interface USER_LIST_RESPONSE extends RESPONSE {                       // array of users for user.list request
    data: {
        users: Array<USER>
        total?: string;
    }
};

export interface USER_REGISTER extends REQUEST, USER_REGISTABLE_FIELDS {      // to register
    meta?: METAS;
    file_hooks?: Array<number>
};

export type USER_REGISTER_RESPONSE = USER_SESSION_RESPONSE;              // to get response of USER_EDIT


export interface USER_EDIT_RESPONSE extends USER_SESSION_RESPONSE {}; // to get response of user edit. it is only session info and name, email, id.

export interface USER_DELETE extends REQUEST, ID {};
export interface USER_DELETE_RESPONSE extends RESPONSE {
    data: ID;
};



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


export interface POST_CONFIG_ID {
    post_config_id?: string;
};





////FORUM////

interface FORUM_IDX extends IDX {};
type CONFIG_IDX= FORUM_IDX;
type POST_IDX = FORUM_IDX;



/**
 * 'FORUM CONFIG' table
 */

export interface CONFIG {
    idx?: number;
    created?: string;
    updated?: number;
    id?: string;
    name?: string;
    description?: string;
    moderators?: string;
    level_list?: number;
    level_view?: number;
    level_write?: number;
    level_comment?: number;
    deleted?: string;
};



interface POST_COMMON_FIELDS {
    title?: string;
    content?: string;
    post_config_id?: string;
    name?: string;
    password?: string;

    address?: string;
    birthdate?: string;
    city?: string;
    contact?: string;
    country?: string;
    created?: string,
    email?: string;
    gender?: string;

    landline?: string;
    last_name?: string;
    middle_name?: string;
    mobile?: string;
    parent_idx?: string;
    province?: string;

    secret?: string;
}

interface META {
    [key: string] : string;
}
type METAS = Array<META>;

interface POST_PRE_FIELDS {
    meta?: METAS;
};

interface POST_CREATIBLE_FIELDS extends POST_CONFIG_ID, POST_COMMON_FIELDS, FILE_HOOKS {};

interface POST_EDITABLE_FIELDS extends IDX, POST_COMMON_FIELDS, FILE_HOOKS {};


interface POST_FIELDS extends POST_COMMON_FIELDS {
    readonly idx?: number;
    readonly user_idx?: string;
    readonly post_config_idx?: number;
    readonly deleted?: string;
    readonly ip?: string;
    readonly create?: string;
    readonly updated?: string;
    readonly files?: FILES;
};


interface IDX_RESPONSE {
    data: {
        idx: number;
    }
}

export interface FILE {
    idx: number;
    name?: string;
    type?: string;
    url?: string;
};
export type FILES = Array<FILE>;

// POST is the resopnse of POST_GET
// export type POST = POST_FIELDS;
export interface POST extends POST_FIELDS, POST_PRE_FIELDS {}

export type POSTS = Array<POST>;
export type CONFIGS = Array<CONFIG>;
export interface CONFIG_CREATE extends REQUEST, CONFIG {};               // to create a forum.
export interface CONFIG_CREATE_RESPONSE extends RESPONSE {
    data: {
        idx: number;
    }
}
export interface CONFIG_EDIT extends REQUEST, CONFIG {};    // to update a forum.
export interface CONFIG_DELETE extends REQUEST, FORUM_IDX {};                         // to delete a forum.
export type CONFIG_DELETE_RESPONSE = DELETE_RESPONSE;
export type CONFIG_EDIT_RESPONSE = EDIT_RESPONSE;
export interface CONFIG_GET extends REQUEST, CONFIG_IDX {};                     // to get a forum config fields.
export interface CONFIG_RESPONSE extends RESPONSE {
    data: CONFIG
};                     // to receive a complete forum config fields. Use this after create/update/get/delete a forum


export interface POST_CREATE extends REQUEST, POST_CREATIBLE_FIELDS {};               // to create a post
export interface POST_EDIT extends REQUEST, POST_EDITABLE_FIELDS {};    // to update a post
export interface POST_CREATE_RESPONSE extends RESPONSE, IDX_RESPONSE {};
export interface POST_EDIT_RESPONSE extends RESPONSE, IDX_RESPONSE {};

export interface POST_DELETE extends REQUEST, POST_IDX {};                                         // to update a post
export interface POST_GET extends REQUEST, POST_IDX {};

export type POST_LIST = LIST;
export interface POST_LIST_RESPONSE extends RESPONSE {
    data: {
        configs: CONFIGS,
        posts: POSTS,
        total: string
    }
};           // to create/update/get/delete a post.


export interface FILE_UPLOAD extends REQUEST {
    model?: string;
    model_idx?: number;
    code?: string;
    unique?: string;
    finish?: string;
}


export interface FILE_UPLOAD_RESPONSE extends RESPONSE {
    data?: {
        idx: number;
    }
}

export interface IMG_SRC {
    idx: number;
    width?: number;
    height?: number;
    quality?: number;
    resize?: '' | 'crop'
}


export interface PAGINATION_OPTION {
  limitPerPage:number;
  currentPage:number;
  numberPerNav:number;
  totalRecord:number;
}


export interface USER_EDIT extends REQUEST, USER_EDITABLE_FIELDS {
    id?: string;    // =====> This is needed only by admin when admin wants to update user's profile.
    meta?: METAS;
    file_hooks?: Array<number>;
}; // to edit user data















/////////////////////////////////////////////////////////////////////////////






/**
 * ---------------- New Strict Interfaces ------------------------------
 * 
 * @warning Use interfaces below !!
 * @warning All the interfaces above are DEPRECATED !!
 * 
 * -----------------------------------------------------------------
 * 
 */

export type NUMBERS = Array<number>;

interface _IDX {
    idx: number;
}

interface _IDX_O {
    idx?: number;
}

interface _ROOT_IDX {
    root_idx: number;
}
interface _PARENT_IDX {
    parent_idx: number;
}

interface _ID { id: string; };
interface _ID_O { id?: string; };


interface _PASSWORD {
    password: string;
}
interface _PASSWORD_O {
    password?: string;
}

interface _CONTENT {
    content: string;
}
export interface _REQUEST_O {
    route?: string;
    session_id?: string;
};
export interface _RESPONSE {
    readonly code: number;
    readonly message?: string;
};


interface _META {
    [key: string] : any;
};
interface _METAS {
    meta?: Array<_META>;
};



//// global

export interface _LIST extends _REQUEST_O {
    select?: string;
    from?: number;
    where?: string;
    bind?: string;
    order?: string;
    limit?: number;
    extra?: any;
    page?: number;
};




export interface _DELETE_REQUEST extends _REQUEST_O, _IDX_O, _ID_O {}; // universal. all kinds of delete requst.
export interface _DATA_REQUEST extends _REQUEST_O, _IDX_O, _ID_O {};
export interface _DELETE_RESPONSE extends _RESPONSE {
    data: {
        idx?: number;
        id?: string;
    }
}; // universal. all kinds of delete response.



///// user

export interface _SESSION_INFO {
    session_id: string;
    id: string;
    idx: number;
    name: string;
    email: string;
    admin?: number;
};

interface _SESSION_INFO_DAT {
    data: _SESSION_INFO;
}

export interface _USER_SESSION_RESPONSE extends _RESPONSE, _SESSION_INFO_DAT {};





//// file upload


interface _FILE_HOOKS {
    file_hooks?: NUMBERS;
};


export interface _FILE {
    idx: number;
    model: string;
    model_idx: number;
    code: string;
    name: string;
    type: string;
    size: number;
    no_of_download: number;
    url: string;
};

interface _FILES {
    files?: Array<_FILE>;
}





export interface UPLOAD extends _REQUEST_O {
    model?: string;
    model_idx?: number;
    code?: string;
    unique?: string;
    finish?: string;
};

export type _UPLOAD = UPLOAD;

export interface UPLOAD_RESPONSE extends _RESPONSE {
    data: _FILE;
};
export type _UPLOAD_RESPONSE = UPLOAD_RESPONSE;




/**
 * User primary photo interfaces
 * 
 * @note this is a special delcaration for user primary phto upload since it needs more care.
 * 
 */
export interface ANONYMOUS_PRIMARY_PHOTO_UPLOAD extends _REQUEST_O {
    model: 'user';
    code: 'primary_photo';
}
export interface PRIMARY_PHOTO_UPLOAD extends ANONYMOUS_PRIMARY_PHOTO_UPLOAD {
    model_idx: number;
    unique: 'Y';
    finish: 'Y';
}


/**
 * 
 */
interface _USER_COMMON_FIELDS {
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
    meta?: METAS;
}
interface _USER_CREATE_FIELDS extends _IDX, _PASSWORD, _USER_COMMON_FIELDS {}


interface _USER_EDIT_FIELDS extends _USER_COMMON_FIELDS {}


export interface _USER_CREATE extends REQUEST, _USER_CREATE_FIELDS, _FILE_HOOKS {}; // to register


export interface _USER_EDIT extends _USER_EDIT_FIELDS {};



/// post


export interface _POST_USER {
    user?: {
        idx: number;
        id: string;
        name: string;
        url_primary_photo?: string;
    }
}

export interface _CONFIG_COMMON_WRITE_FIELDS {
    name?: string;
    description?: string;
    moderators?: string;
    level_list?: number;
    level_view?: number;
    level_write?: number;
    level_comment?: number;
};

export interface _CONFIG_COMMON_READ_FIELDS {
    readonly idx: number;
    readonly created: string;
    readonly updated: number;
    readonly id: string;
    readonly name: string;
    readonly description: string;
    readonly moderators: string;
    readonly level_list: number;
    readonly level_view: number;
    readonly level_write: number;
    readonly level_comment: number;
    readonly deleted: string;
}


export interface _CONFIG_CREATE extends _ID, _CONFIG_COMMON_WRITE_FIELDS {};
export interface _CONFIG_EDIT extends _IDX, _CONFIG_COMMON_WRITE_FIELDS {};
export interface _CONFIG_READ extends _CONFIG_COMMON_READ_FIELDS {};

export type _CONFIGS = Array< _CONFIG_READ >;

export interface _POST_CONFIG_ID {
    post_config_id: string;
};


interface _POST_COMMON_WRITE_FIELDS {
    title?: string;
    content?: string;
    name?: string;
    password?: string;
    address?: string;
    birthdate?: string;
    city?: string;
    contact?: string;
    country?: string;
    created?: string,
    email?: string;
    gender?: string;
    landline?: string;
    last_name?: string;
    middle_name?: string;
    mobile?: string;
    parent_idx?: string;
    province?: string;
    secret?: string;
}

interface _POST_COMMON_READ_FIELDS {
    readonly title: string;
    readonly content: string;
    readonly name: string;
    readonly password: string;
    readonly address: string;
    readonly birthdate: string;
    readonly city: string;
    readonly contact: string;
    readonly country: string;
    readonly created: string,
    readonly email: string;
    readonly gender: string;
    readonly landline: string;
    readonly last_name: string;
    readonly middle_name: string;
    readonly mobile: string;
    readonly province: string;
    readonly secret: string;
}


interface _COMMENT_COMMON_READ_FIELDS {
    readonly content: string;
    readonly name: string;
    readonly password: string;
    readonly address: string;
    readonly city: string;
    readonly contact: string;
    readonly country: string;
    readonly created: string,
    readonly email: string;
    readonly gender: string;
    readonly landline: string;
    readonly last_name: string;
    readonly middle_name: string;
    readonly mobile: string;
    readonly province: string;
}


export interface _POST extends
    _IDX,
    _POST_COMMON_READ_FIELDS,
    _POST_USER,
    _FILES,
    _COMMENTS,
    _METAS {}
export type _POSTS = Array<_POST>;


export interface _POST_CREATE extends
    _REQUEST_O,
    _POST_COMMON_WRITE_FIELDS,
    _POST_CONFIG_ID,
    _FILE_HOOKS,
    _METAS {};
    
export interface _POST_CREATE_RESPONSE extends _RESPONSE {
    data: _POST
};

export interface _POST_EDIT extends
    _REQUEST_O,
    _IDX,
    _POST_COMMON_WRITE_FIELDS,
    _FILE_HOOKS,
    _METAS {};
export interface _POST_EDIT_RESPONSE extends _RESPONSE {
    data: _POST
};



export interface _COMMENT extends 
    _IDX,
    _ROOT_IDX,
    _PARENT_IDX,
    _COMMENT_COMMON_READ_FIELDS,
    _FILES,
    _POST_USER {};
export interface _COMMENT_DATA {
    data: _COMMENT;
}
interface _COMMENTS {
    comments?: Array<_COMMENT>;
}


export interface _POST_LIST_RESPONSE extends _RESPONSE {
    data: {
        configs: _CONFIGS,
        posts: _POSTS,
        total: number
    }
};


export interface _COMMENT_CREATE extends
    _REQUEST_O,
    _PARENT_IDX,
    _CONTENT,
    _FILE_HOOKS {};
export interface _COMMENT_CREATE_RESPONSE extends
    _RESPONSE,
    _COMMENT_DATA {};


export interface _COMMENT_EDIT extends
    _REQUEST_O,
    _IDX,
    _CONTENT,
    _FILE_HOOKS {};
export interface _COMMENT_EDIT_RESPONSE extends
    _RESPONSE,
    _COMMENT_DATA {};
