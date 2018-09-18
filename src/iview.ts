import 'iview/dist/styles/iview.css'
import {
    Row,
    Col,
    Button,
    Card,
    Alert,
    Avatar,
    Badge,
    DatePicker,
    Divider,
    Form,
    FormItem,
    Icon,
    Input,
    Layout,
    LoadingBar,
    Menu,
    MenuItem,
    Message,
    Modal,
    Page,
    Poptip,
    Radio,
    RadioGroup,
    Sider,
    Spin,
    Table,
    Tabs,
    TabPane,
    Tag,
    Time,
    Tooltip,
    Upload,
    Select,
    Option,
    Notice,
} from 'iview'

const iview = {
    Row,
    Col,
    Button,
    Card,
    Alert,
    Avatar,
    Badge,
    DatePicker,
    Divider,
    Form,
    FormItem,
    Icon,
    Input,
    Layout,
    LoadingBar,
    Menu,
    MenuItem,
    Message,
    Modal,
    Page,
    Poptip,
    Radio,
    RadioGroup,
    Sider,
    Spin,
    Table,
    Tabs,
    TabPane,
    Tag,
    Time,
    Tooltip,
    Upload,
    Select,
    Option,
    Notice,
}

export default function (Vue, opts = {}) {
    Object.keys(iview).forEach(key => {
        Vue.component(key, iview[key])
    })
    Vue.prototype.$Loading = LoadingBar;
    Vue.prototype.$Message = Message;
    Vue.prototype.$Modal = Modal;
    Vue.prototype.$Notice = Notice;
    Vue.prototype.$Spin = Spin;
}

