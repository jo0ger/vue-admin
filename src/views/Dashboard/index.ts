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

    private controls = {
        pv: {
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
                dimension: 'week',
                startDate: '',
                endDate: ''
            }
        },
        like: {
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
                dimension: 'week',
                startDate: '',
                endDate: ''
            }
        },
        comment: {
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
                dimension: 'week',
                startDate: '',
                endDate: ''
            }
        },
        message: {
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
                dimension: 'week',
                startDate: '',
                endDate: ''
            }
        }
    }

    private chartInstance: any = {}

    private mounted () {
        this.getCount()
        this.getCountWeekTrend()
    }

    private async getCount () {
        const res = await this.api.stat.count()
        if (res.success) {
            Object.keys(res.data).forEach(key => {
                this.controls[key].count = res.data[key]
            })
        }
    }

    private getCountWeekTrend () {
        const startDate = this.formatDate(this.moment().subtract(6, 'day'), 'YYYY-MM-DD 00:00:00')
        const endDate = this.moment().format('YYYY-MM-DD 23:59:59')
        Object.keys(this.controls).forEach(async key => {
            const curControl = this.controls[key]
            const trend = await this.getRangeTrend(key, 'day', startDate, endDate)
            curControl.weekTrend = trend
            this.initCountChart(key)
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

    private initTrendChart () {}

    private beforeDestroy () {
        Object.values(this.chartInstance).forEach((ins: any) => {
            ins.destroy()
        })
    }
}