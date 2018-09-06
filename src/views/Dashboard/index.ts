/// <reference path="../../typings/api.d.ts" />


/**
 * @desc Dashboard
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-09-01 21:53:55
 */

import Vue from '@/vue'
import { Component } from '@/utils/decorators'
import { Container } from '@/components/common'
import G2 from '@antv/g2'

@Component({
    name: 'Dashboard',
    components: {
        Container ,
    },
})
export default class Dashboard extends Vue {
    private topColResponsiveProps = {
        xs: 24,
        sm: 12,
        md: 12,
        lg: 6
    }

    date = []

    private chartInstance: any = {}

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

    private async dateRangeChange (ctrl) {
        const range = ctrl.control.range
        if (range === 'other') {
            
        } else {
            const rangeMap = {
                week: 6,
                month: 29,
                year: 364
            }
            const today = this.moment()
            const endDate = today.format('YYYY-MM-DD 23:59:59')
            const startDate = this.formatDate(today.subtract(rangeMap[range], 'day'), 'YYYY-MM-DD 00:00:00')
            ctrl.trend = await this.getRangeTrend(ctrl.target, ctrl.control.dimension, startDate, endDate)
            this.chartInstance[ctrl.target].changeData(ctrl.trend)
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
            }
        })
        chart.axis('date', false)
        chart.axis('count', false)
        chart.area().position('date*count').shape('smooth').color(control.weekTrendChart.color).opacity(control.weekTrendChart.opacity)
        chart.render()
    }

    private initTrendChart (target) {
        const control = this.controls[target]
        const chart = this.chartInstance[target] = new G2.Chart({
            container: target + '-trend-chart',
            forceFit: true,
            height: 300,
            padding: [60],
        })
        chart.source(control.weekTrend)
        chart.scale('count', {
            alias: control.weekTrendChart.alias,
            min: 0,
        })
        chart.tooltip({
            crosshairs: {
                type: 'line',
            }
        })
        chart.axis('date', {
            title: {
                fill: '#404040',
                fontSize: '16'
            },
        })
        chart.axis('count', {
            title: control.weekTrendChart.alias
        })
        chart.area().position('date*count').shape('smooth').color(control.weekTrendChart.color).opacity(control.weekTrendChart.opacity)
        chart.render()
    }

    private async selectDate (ctrl) {
        const { control, target } = ctrl
        const startDate = this.moment(control.date[0]).format('YYYY-MM-DD HH:mm:ss')
        const endDate = this.moment(control.date[1]).format('YYYY-MM-DD HH:mm:ss')
        ctrl.trend = await this.getRangeTrend(target, control.dimension, startDate, endDate)
    }

    private beforeDestroy () {
        Object.values(this.chartInstance).forEach((ins: any) => {
            ins.destroy()
        })
    }

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
                opacity: .8
            },
            trend: [],
            control: {
                dimension: 'day',
                date: [],
                range: 'week'
            }
        },
        like: {
            target: 'like',
            title: '文章点赞数',
            count: {
                today: 0,
                total: 0,
            },
            weekTrend: [],
            weekTrendChart: {
                alias: '点赞数',
                color: '#F95959',
                opacity: .8
            },
            trend: [],
            control: {
                dimension: 'day',
                date: [],
                range: 'week'
            }
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
                color: '#46cdcf',
                opacity: .8
            },
            trend: [],
            control: {
                dimension: 'day',
                date: [],
                range: 'week'
            }
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
                opacity: .8
            },
            trend: [],
            control: {
                dimension: 'day',
                date: [],
                range: 'week'
            }
        }
    }

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
                    }
                },
                {
                    text: '最近1个月',
                    value () {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        return [start, end];
                    }
                },
                {
                    text: '最近3个月',
                    value () {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        return [start, end];
                    }
                }
            ]
        }
    }
}