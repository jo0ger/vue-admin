/// <reference path="../../typings/api.d.ts" />


/**
 * @desc Dashboard
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-09-01 21:53:55
 */

import Vue from '@/vue'
import { Component } from '@/utils/decorators'
import G2 from '@antv/g2'

@Component({
    name: 'Dashboard',
})
export default class Dashboard extends Vue {

    private get datePickerOption () {
        return {
            shortcuts: [
                {
                    text: '最近1周',
                    value () {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        return [start, end];
                    },
                },
                {
                    text: '最近1个月',
                    value () {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        return [start, end];
                    },
                },
                {
                    text: '最近3个月',
                    value () {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        return [start, end];
                    },
                },
            ],
        }
    }
    private chartInstance: any = {}

    private controls = {
        pv: {
            target: 'pv',
            title: '文章浏览量',
            count: {
                today: 0,
                total: 0,
            },
            weekTrend: [],
            weekTrendChart: {
                alias: '浏览量',
                color: '#2d8cf0',
                opacity: .8,
            },
            trend: [],
            control: {
                dimension: 'day',
                date: [],
                range: 'week',
            },
            list: {
                sortBy: 'meta.pvs',
                order: -1,
                data: [],
            },
        },
        up: {
            target: 'up',
            title: '文章点赞数',
            count: {
                today: 0,
                total: 0,
            },
            weekTrend: [],
            weekTrendChart: {
                alias: '点赞数',
                color: '#F95959',
                opacity: .8,
            },
            trend: [],
            control: {
                dimension: 'day',
                date: [],
                range: 'week',
            },
            list: {
                sortBy: 'meta.ups',
                order: -1,
                data: [],
            },
        },
        comment: {
            target: 'comment',
            title: '文章评论量',
            count: {
                today: 0,
                total: 0,
            },
            weekTrend: [],
            weekTrendChart: {
                alias: '评论量',
                color: '#f5b17b',
                opacity: .8,
            },
            trend: [],
            control: {
                dimension: 'day',
                date: [],
                range: 'week',
            },
            list: {
                sortBy: 'meta.comments',
                order: -1,
                data: [],
            },
        },
        message: {
            target: 'message',
            title: '站内留言数',
            count: {
                today: 0,
                total: 0,
            },
            weekTrend: [],
            weekTrendChart: {
                alias: '留言数',
                color: '#ff467e',
                opacity: .8,
            },
            trend: [],
            control: {
                dimension: 'day',
                date: [],
                range: 'week',
            },
        },
        user: {
            target: 'user',
            title: '新增用户量',
            count: {
                today: 0,
                total: 0,
            },
            weekTrend: [],
            weekTrendChart: {
                alias: '用户量',
                color: '#585c72',
                opacity: .8,
            },
            trend: [],
            control: {
                dimension: 'day',
                date: [],
                range: 'week',
            },
        },
    }

    private mounted () {
        this.getCount()
        this.getTrends()
    }

    private async getCount () {
        const res = await this.api.stat.count()
        if (res.success) {
            Object.keys(res.data).forEach(key => {
                this.controls[key].count = res.data[key]
            })
        }
    }

    private getTrends () {
        const today = this.moment()
        const endDate = today.format('YYYY-MM-DD 23:59:59')
        const startDate = this.formatDate(today.subtract(6, 'day'), 'YYYY-MM-DD 00:00:00')
        Object.keys(this.controls).forEach(async key => {
            const curControl = this.controls[key]
            // week trend
            const weekTrend = await this.getRangeTrend(curControl.target, 'day', startDate, endDate)
            curControl.weekTrend = weekTrend
            this.initCountChart(key)

            // trend
            await this.dateRangeChange(curControl)
            this.initTrendChart(key)
        })
    }

    private async getRangeTrend (target: string, dimension, startDate, endDate) {
        const res = await this.api.stat.trend({
            startDate,
            endDate,
            dimension,
            target,
        })
        if (res.success) {
            return res.data.trend
        }
        return []
    }

    private async getRangeTrendList (target: string, startDate, endDate, sortBy, order) {
        const res = await this.api.article.list({
            startDate,
            endDate,
            order,
            sortBy,
            page: 1,
            limit: 7,
        })
        if (res.success) {
            return res.data.list
        }
    }

    private async dateRangeChange (ctrl) {
        const range = ctrl.control.range
        ctrl.control.date = []
        if (range !== 'other') {
            const rangeMap = {
                week: 6,
                month: 29,
                threeMonth: 89,
            }
            ctrl.control.date[1] = new Date()
            ctrl.control.date[0] = new Date(this.moment().subtract(rangeMap[range], 'day').valueOf())
            this.selectDate(ctrl)
        }
    }

    private async selectDate (ctrl) {
        const { control, target, list } = ctrl
        const startDate = this.moment(control.date[0]).format('YYYY-MM-DD 00:00:00')
        const endDate = this.moment(control.date[1]).format('YYYY-MM-DD 23:59:59')
        ctrl.trend = await this.getRangeTrend(target, control.dimension, startDate, endDate)
        const chart = this.chartInstance[ctrl.target]
        chart.changeData(ctrl.trend)
        chart.render()
        // 获取排行榜
        if (list) {
            ctrl.list.data = await this.getRangeTrendList(target, startDate, endDate, list.sortBy, list.order)
        }
    }

    private initCountChart (target) {
        const control = this.controls[target]
        const chart = this.chartInstance[target] = new G2.Chart({
            container: target + '-count-chart',
            forceFit: true,
            height: 50,
            padding: 0,
        })
        chart.source(control.weekTrend)
        chart.scale('count', {
            alias: control.weekTrendChart.alias,
            min: 0,
        })
        chart.tooltip({
            crosshairs: {
                type: 'line',
            },
        })
        chart.axis('date', false)
        chart.axis('count', false)
        chart.area()
            .position('date*count')
            .shape('smooth')
            .color(control.weekTrendChart.color)
            .opacity(control.weekTrendChart.opacity)
        chart.render()
    }

    private initTrendChart (target) {
        const control = this.controls[target]
        const chart = this.chartInstance[target] = new G2.Chart({
            container: target + '-trend-chart',
            forceFit: true,
            height: 300,
            padding: [40, 60],
        })
        chart.source(control.weekTrend)
        chart.scale('count', {
            alias: control.weekTrendChart.alias,
            min: 0,
        })
        chart.tooltip({
            crosshairs: {
                type: 'line',
            },
        })
        chart.axis('date', true)
        chart.axis('count', {
            title: control.weekTrendChart.alias,
        })
        chart.area()
            .position('date*count')
            .shape('smooth')
            .color(control.weekTrendChart.color)
            .opacity(control.weekTrendChart.opacity - .4)
        chart.line()
            .position('date*count')
            .shape('smooth')
            .color(control.weekTrendChart.color)
            .size(2)
        chart.render()
    }

    private getCountColResponsiveProps (key) {
        return {
            pv: {
                xs: 24,
                sm: 12,
                md: 8,
                lg: 8,
            },
            up: {
                xs: 24,
                sm: 12,
                md: 8,
                lg: 8,
            },
            comment: {
                xs: 24,
                sm: 12,
                md: 8,
                lg: 8,
            },
            message: {
                xs: 24,
                sm: 12,
                md: 12,
                lg: 12,
            },
            user: {
                xs: 24,
                sm: 24,
                md: 12,
                lg: 12,
            },
        }[key]
    }

    private beforeDestroy () {
        Object.values(this.chartInstance).forEach((ins: any) => {
            ins.destroy()
        })
    }
}