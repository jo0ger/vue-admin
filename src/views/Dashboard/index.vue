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
                <RadioGroup type="button" class="dimension">
                    <Radio label="周"></Radio>
                    <Radio label="月"></Radio>
                    <Radio label="年"></Radio>
                </RadioGroup>
                <DatePicker type="date" placeholder="Select date" style="width: 200px"></DatePicker>
            </div>
        </Card>
    </Container>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="stylus" scoped src="./index.styl"></style>
