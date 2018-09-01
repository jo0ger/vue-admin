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
     * @desc 分页 request 参数规范
     */
    export interface IPageableRequest {
        page: number
        limit?: number
    }

    /**
     * @desc 分页 response 返回数据规范
     */
    export interface IPageableResponse {
        total: number
        current: number
        pages: number
        limit: number
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
     * @desc 公用App模块
     */
    namespace AppModule {}
}