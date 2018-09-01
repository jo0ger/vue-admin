/**
 * @desc Api接口结构定义，接口数据变动需要同步到这里
 */

declare namespace WebApi {
    /**
     * **************************************************
     * 通用定义
     * **************************************************
     */

    /**
     * @desc 数据返回格式
     */
    export interface IResponse<T = {}> {
        code: number
        success: boolean
        message: string
        data: T
    }

    /**
     * @desc 分页信息
     */
    export interface PageInfo {
        total: number
        current: number
        pages: number
        limit: number
    }

    /**
     * @desc 分页 request 参数规范
     */
    export interface IPageableRequest {
        page: number
        limit?: number
    }

    /**
     * @desc 分页 response 返回数据规范
     */
    export interface IPageableResponse<T = {}> extends IResponse<{
        list: T[],
        pageInfo: PageInfo
    }> {}

    export interface ModuleShare {
        id: string
        createdAt: string
        updatedAt: string
        extends: {
            key: string
            value: string
        }[]
    }

    /**
     * **************************************************
     * 各业务模块
     * **************************************************
     * @namespace {Module}Name
     * @example
     *  namespace TestModule {
     *      ## 请求参数类型
     *      export type req = {}
     *      ## 返回数据类型
     *      export type res = IReponse<T>
     *  }
     */

    /**
     * @desc Article模块
     */
    namespace ArticleModule {
        namespace list {
            export type req =  IPageableRequest & {
                state?: number
                source?: number
                category?: string
                tag?: string
                keyword?: string
                startDate?: Date
                endDate?: Date
                orderBy?: -1 | 1
                sortBy?: string
            }
    
            export type res = IPageableResponse<Article[]>
        }

        namespace item {
            export type req = {}
            export type res = IResponse<Article>
        }

        namespace archives {
            export type req = {}
            export type res = IResponse<{
                count: number
                list: {
                    year: number
                    months: {
                        month: number
                        monthStr: string
                        articles: Article[]
                    }[]
                }[]
            }>
        }

        namespace create {
            export type req = Article
            export type res = IResponse<Article>
        }

        namespace update {
            export type req = Article
            export type res = IResponse<Article>
        }

        namespace like {
            export type req = {}
            export type res = IResponse<boolean>
        }
    
        namespace unlike {
            export type req = {}
            export type res = IResponse<boolean>
        }

        namespace deleteItem {
            export type req = {}
            export type res = IResponse<boolean>
        }

        type Article = ModuleShare & {
            title: string
            description: string
            state: number
            source: number
            renderedContnt: string
            keywords: string[]
            thumb: string
            category: CategoryModule.Category
            tag: TagModule.Tag[]
            publishedAt: string
            meta: {
                pvs: number
                ups: number
                comments: number
            }
        }
    }

    namespace CategoryModule {
        type Category = ModuleShare & {
            name: string
            description: string
        }

        namespace list {
            export type req =  IPageableRequest & {
                keyword?: string
            }
    
            export type res = IPageableResponse<Category[]>
        }

        namespace item {
            export type req = {}
            export type res = IResponse<Category>
        }

        namespace create {
            export type req = Category
            export type res = IResponse<Category>
        }

        namespace update {
            export type req = Category
            export type res = IResponse<Category>
        }

        namespace deleteItem {
            export type req = {}
            export type res = IResponse<boolean>
        }
    }

    namespace TagModule {
        type Tag = ModuleShare & {
            name: string
            description: string
        }

        namespace list {
            export type req =  IPageableRequest & {
                keyword?: string
            }
    
            export type res = IPageableResponse<Tag[]>
        }

        namespace item {
            export type req = {}
            export type res = IResponse<Tag>
        }

        namespace create {
            export type req = Tag
            export type res = IResponse<Tag>
        }

        namespace update {
            export type req = Tag
            export type res = IResponse<Tag>
        }

        namespace deleteItem {
            export type req = {}
            export type res = IResponse<boolean>
        }
    }

    namespace UserModule {
        type User = ModuleShare & {
            name: string
            description: string
            email: string
            avatar: string
            role: number
            password?: string
            mute: boolean
            company: string
            location: string
            github: {
                id: string
                login: string
            }
        }

        namespace list {
            export type req =  {}
            export type res = IPageableResponse<User[]>
        }

        namespace item {
            export type req = {}
            export type res = IResponse<User>
        }

        namespace update {
            export type req = {
                mute?: boolean
            }
            export type res = IResponse<User>
        }
    }

    namespace NotificationModule {
        type Notification = ModuleShare & {
            type: number
            classify: string
            viewed: boolean
            verb: string
            target: {
                article?: ArticleModule.Article
                user?: UserModule.User
                comment?: CommentModule.Comment
            }
            actors: {
                from?: UserModule.User
                to?: UserModule.User
            }
        }

        namespace list {
            export type req = IPageableRequest & {
                type?: number
                classify?: number
                viewed?: boolean
            }
            export type res = IPageableResponse<Notification[]>
        }

        namespace item {
            export type req = {}
            export type res = IResponse<Notification>
        }

        namespace view {
            export type req = {}
            export type res = IResponse<boolean>
        }

        namespace viewAll {
            export type req = {}
            export type res = IResponse<boolean>
        }

        namespace deleteItem {
            export type req = {}
            export type res = IResponse<boolean>
        }
    }

    namespace CommentModule {
        type Comment = ModuleShare & {
            renderedContent: string
            state: number
            spam: boolean
            author: UserModule.User
            ups: number
            sticky: boolean
            type: number
            article?: ArticleModule.Article
            meta: {
                ip: string
                location: object
                ua: string
                referer: string
            }
            parent: Comment
            forward: Comment
        }

        namespace list {
            export type req =  IPageableRequest & {
                state?: number
                type?: number
                author?: string
                article?: string
                parent?: string
                keyword?: string
                startDate?: Date
                endDate?: Date
                orderBy?: -1 | 1
                sortBy?: string
            }
    
            export type res = IPageableResponse<Comment[]>
        }

        namespace item {
            export type req = {}
            export type res = IResponse<Comment>
        }

        namespace create {
            export type req = Comment
            export type res = IResponse<Comment>
        }

        namespace update {
            export type req = Comment
            export type res = IResponse<Comment>
        }

        namespace like {
            export type req = {}
            export type res = IResponse<boolean>
        }
    
        namespace unlike {
            export type req = {}
            export type res = IResponse<boolean>
        }

        namespace deleteItem {
            export type req = {}
            export type res = IResponse<boolean>
        }
    }

    namespace SettingModule {
        type Setting = ModuleShare & {
            site: {
                welcome: string
                description: string
                hobby: string
                skill: string
                music: string
                location: string
                company: string
                links: {
                    name: string
                    github: string
                    avatar: string
                    slogan: string
                    site: string
                }[]
                musicId: string
            }
            keys: {
                aliyun: {
                    accessKeyId: string
                    accessKeySecret: string
                    bucket: string
                    region: string
                },
                alinode: {
                    appid: string
                    secret: string
                },
                mail: {
                    user: string
                    pass: string
                },
                github: {
                    clientID: string
                    clientSecret: string
                }
            }
            limit: {
                articleCount: number
                commentCount: number
                relatedArticleCount: number
                hotArticleCount: number
                commentSpamMaxCount: number
            }
        }

        namespace getData {
            export type req =  {}
    
            export type res = IResponse<Setting>
        }

        namespace update {
            export type req = {
                site: object
                keys: object
                limit: object
            }
            export type res = IResponse<Setting>
        }
    }

    namespace AuthModule {
        namespace login {
            export type req = {
                username: string
                password: string
            }
            export type res = IResponse<{
                id: string
                token: string
            }>
        }

        namespace logout {
            export type req = {}
            export type res = IResponse<{}>
        }

        namespace info {
            export type req = {}
            export type res = IResponse<UserModule.User>
        }

        namespace update {
            export type req = UserModule.User
            export type res = IResponse<UserModule.User>
        }

        namespace password {
            export type req = {
                oldPassword: string
                password: string
            }
            export type res = IResponse<{}>
        }
    }
}
