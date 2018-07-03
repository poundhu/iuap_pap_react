import React, { Component } from "react";
import { actions } from "mirrorx";
import { Row,Col,Button } from 'tinper-bee';
import Header from "components/Header";
import DatePicker from 'bee-datepicker';
import 'bee-datepicker/build/DatePicker.css';
import Form from 'bee-form';
import './index.less';
import moment from "moment";
const { WeekPicker } = DatePicker;

class WeekPickerC extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weekDate:''
        }
    }
    getValue=()=>{
        this.props.form.validateFields((err, values) => {
            console.log(this.state)
            console.log(values);
        });
    }

    render() {
        const { getFieldProps } = this.props.form;
        const self=this;
        return ( 
            <div className = 'editor-example' >
                <Header title = '周选择示例'/ >
                <Row >
                    <Col md = {6} >
                        <WeekPicker placeholder="选择周" defaultValue={this.state.weekDate}
                            {
                                ...getFieldProps('weekDate', {
                                    onChange: function (v) { debugger;
                                        self.setState({
                                            weekDate: v
                                        })
                                    }
                                })
                            }
                        />
                    </Col> 
                    <Col md = {6} >
                        <Button onClick={this.getValue}>
                            获取值
                        </Button>
                    </Col> 

                </Row> 

            </div>
        )
    }
}

export default Form.createForm()(WeekPickerC);