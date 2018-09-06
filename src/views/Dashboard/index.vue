<!--
 * @desc Dashboard
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-09-01 21:53:55
 -->
<template>
    <Container class="dashboard-page" :title="$route.meta.title">
        <Avatar slot="logo" icon="md-book" style="color: #ffadd2;background-color: #fff0f6">U</Avatar>
        <Row :gutter="16">
            <Col v-bind="topColResponsiveProps" v-for="(control, key) in controls" :key="key">
                <Card class="stat-card" :title="control.title">
                    <Tooltip slot="extra" placement="top" :content="control.title">
                        <Icon type="ios-alert-outline" />
                    </Tooltip>
                    <div class="total">
                        总{{control.title.slice(-3)}}
                        <span>{{ control.count.total }}</span>
                    </div>
                    <div :id="key + '-count-chart'"></div>
                    <Divider class="divider"></Divider>
                    <div class="today">今日{{control.title.slice(-3)}}：{{ control.count.today }}</div>
                </Card>
            </Col>
        </Row>
        <Card class="stat-card" :title="control.title + '趋势统计'" v-for="(control, key) in controls" :key="key">
            <div slot="extra">
                <RadioGroup v-model="control.control.range" type="button" class="dimension" @on-change="dateRangeChange(control)">
                    <Radio label="week">最近一周</Radio>
                    <Radio label="month">最近一月</Radio>
                    <Radio label="year">最近一年</Radio>
                    <Radio label="other">自定义</Radio>
                </RadioGroup>
                <DatePicker
                    confirm
                    type="daterange"
                    v-model="control.date"
                    :options="datePickerOption"
                    placement="bottom-end"
                    placeholder="选择日期"
                    style="width: 200px"
                    @on-ok="selectDate(control)">
                </DatePicker>
            </div>
            <div :id="key + '-trend-chart'"></div>
        </Card>
    </Container>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="stylus" scoped src="./index.styl"></style>
