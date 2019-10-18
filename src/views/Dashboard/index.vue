<!--
 * @desc Dashboard
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-09-01 21:53:55
 -->
<template>
    <Container class="dashboard-page" :title="$route.meta.title">
        <Avatar slot="logo" :icon="$route.meta.icon" style="color: #ffadd2;background-color: #fff0f6">U</Avatar>
        <Row :gutter="16">
            <Col v-bind="getCountColResponsiveProps(key)" v-for="(control, key) in controls" :key="key">
                <Card class="stat-card" :title="control.title">
                    <Tooltip slot="extra" placement="top" :content="control.title">
                        <Icon type="ios-alert-outline" />
                    </Tooltip>
                    <div class="total">
                        总{{control.title.slice(-3)}}
                        <span :style="{ color: control.weekTrendChart.color }">{{ control.count.total }}</span>
                    </div>
                    <div :id="key + '-count-chart'"></div>
                    <Divider class="divider"></Divider>
                    <div class="today">今日{{control.title.slice(-3)}}：{{ control.count.today }}</div>
                </Card>
            </Col>
        </Row>
        <Row :gutter="16" v-for="(control, key) in controls" :key="key">
            <Col v-bind="['message', 'user'].includes(key) ? { lg: 24 } : getCountColResponsiveProps('trend')">
                <Card class="stat-card" :title="control.title + '趋势统计'">
                    <div slot="extra">
                        <RadioGroup v-model="control.control.range" type="button" class="dimension" @on-change="dateRangeChange(control)">
                            <Radio label="week">最近1周</Radio>
                            <Radio label="month">最近1月</Radio>
                            <Radio label="threeMonth">最近3月</Radio>
                            <Radio label="other">自定义</Radio>
                        </RadioGroup>
                        <DatePicker
                            confirm
                            type="daterange"
                            :disabled="control.control.range !== 'other'"
                            v-model="control.control.date"
                            :value="control.control.date"
                            :options="datePickerOption"
                            placement="bottom-end"
                            placeholder="选择日期"
                            style="width: 200px"
                            @on-ok="selectDate(control)">
                        </DatePicker>
                    </div>
                    <div class="trend">
                        <div :id="key + '-trend-chart'" class="trend-chart"></div>
                    </div>
                </Card>
            </Col>
            <Col v-bind="getCountColResponsiveProps('rank')" v-if="!['message', 'user'].includes(key)">
                <Card class="stat-card" :title="control.title + '排名'">
                    <div class="rank">
                        <div class="rank-list" :class="key + '-rank-list'" v-if="!['message', 'user'].includes(key)">
                            <ul class="article-list">
                                <li class="article" v-for="(article, index) in control.list.data" :key="article._id">
                                    <span class="rank-number">{{ index + 1 }}</span>
                                    <router-link class="title" :to="{ name: 'ArticleDetail', params: { id: article._id }}">{{ article.title }}</router-link>
                                    <span class="count">{{ article.meta[key + 's'] }}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </Card>
            </Col>
        </Row>
    </Container>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="stylus" scoped src="./index.styl"></style>
