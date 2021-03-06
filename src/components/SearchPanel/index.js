import React, { Component } from 'react';
import { Panel,Button } from 'tinper-bee';
import PropTypes from 'prop-types';
import './index.less';
import { FormattedMessage, defineMessages } from 'react-intl';
import classnames from 'classnames'

const messages = defineMessages({
    clear: {
        id: 'SearchPanel.clear',
        defaultMessage: '清空',
    },
    search: {
        id: 'SearchPanel.search',
        defaultMessage: '查询',
    },
    open: {
        id: "SearchPanel.open",
        defaultMessage: "展开"
    },
    close: {
        id: "SearchPanel.close",
        defaultMessage: "收起"
    }
});

/**
 * 部分不能通过this.props.form.resetFields()清空的组件，需要传reset方法，在reset方法中自行清空
 */
const propTypes = {
    searchOpen:PropTypes.bool,//是否默认展开，false默认关闭
    search: PropTypes.func,//查询的回调
    reset:PropTypes.func,//重置的回调
    resetName:PropTypes.string,//重置的文字
    searchName:PropTypes.string,//查询的文字
    title: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
    ])
};

const defaultProps = {
    searchOpen:false,
    search: () => {},
    reset: () => {},
    title: "查询与筛选"
};


class SearchPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchOpen:this.props.searchOpen
        };
    }
    componentDidMount() {

    }

    open=()=>{
        this.setState({
            searchOpen: !this.state.searchOpen
        })
    }

    search=()=>{
        let self=this;
        this.props.form.validateFields((err, values) => {
            self.props.search(err, values);
        });
    }
    reset=()=>{
        this.props.form.resetFields();
        this.props.reset();
    }
    render() {
        const {children,className,form,resetName,searchName } = this.props;
        let classes = 'search-panel';
        if(className){
            classes += ' '+className
        }
        let header = () => {
            return (
                <div className="clearfix" onClick={this.open}>
                    <span  className={'search-panel-title'}>
                        {this.props.title}
                    </span>
                    <span  className={'search-panel-icon'}>
                        {this.state.searchOpen ? <FormattedMessage {...messages.close} /> : <FormattedMessage {...messages.open} />}
                        <i className={classnames({
                                'uf': true,
                                'uf-arrow-down': this.state.searchOpen,
                                'uf-arrow-right': !this.state.searchOpen
                            })}/>
                    </span>
                </div>
            )
        };
        return (
           <Panel className={classes}  header={header()}  collapsible expanded={this.state.searchOpen}>
                {children}
                <div className='search-panel-btn'>
                    <Button
                        size='sm'
                        className='reset-btn'
                        onClick={this.reset}>
                        {
                            resetName?resetName:<FormattedMessage {...messages.clear} />
                        }
                        </Button>
                    <Button
                        size='sm'
                        className='submit-btn'
                        onClick={this.search}>
                        {
                            searchName?searchName:<FormattedMessage {...messages.search} />
                        }
                        </Button>
                </div>
           </Panel>
        )
    }
}
SearchPanel.propTypes = propTypes;
SearchPanel.defaultProps = defaultProps;
export default SearchPanel;
