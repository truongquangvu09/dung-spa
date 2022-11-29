import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import StoreIcon from '@mui/icons-material/Store';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import classNames from 'classnames/bind';
import styles from './Main.module.scss';
import DataTableProducts from '../ProductsManagement';
import DataTableNews from '../NewsManagement';
import DataTableUsers from '../UsersManagement';
import TabsNews from './../NewsManagement/TabNews';
import TabProducts from './../ProductsManagement/TabProducts';
import SalesManagement from './../SalesManagement/index';
import Datatable from './../../../admin/components/datatable/Datatable';
import BasicDetailPanels from '../OrdersManagement';
import DataBooking from './../BookingManagement/index';

const cx = classNames.bind(styles);

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

function VerticalTabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box
            className={cx('tab-wrapper')}
            sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 700 }}
        >
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{ borderRight: 1, borderColor: 'divider', width: 400 }}
            >
                <Tab
                    className={cx('tab')}
                    sx={{ display: 'inline', textAlign: 'start' }}
                    icon={<MonetizationOnIcon className={cx('icon')} sx={{ fontSize: 20 }} />}
                    label="Sales"
                    {...a11yProps(0)}
                />
                <Tab
                    className={cx('tab')}
                    sx={{ display: 'inline', textAlign: 'start' }}
                    icon={<CalendarMonthIcon className={cx('icon')} sx={{ fontSize: 20 }} />}
                    label="Booking"
                    {...a11yProps(1)}
                />
                <Tab
                    className={cx('tab')}
                    sx={{ display: 'inline', textAlign: 'start' }}
                    icon={<StoreIcon className={cx('icon')} sx={{ fontSize: 20 }} />}
                    label=" Quản lý sản phẩm"
                    {...a11yProps(2)}
                />
                <Tab
                    className={cx('tab')}
                    sx={{ display: 'inline', textAlign: 'start' }}
                    icon={<NewspaperIcon className={cx('icon')} sx={{ fontSize: 20 }} />}
                    label="Quản lý tin tức"
                    {...a11yProps(3)}
                />
                <Tab
                    className={cx('tab')}
                    sx={{ display: 'inline', textAlign: 'start' }}
                    icon={<PersonOutlineIcon className={cx('icon')} sx={{ fontSize: 20 }} />}
                    label="Quản lý tài khoản"
                    {...a11yProps(4)}
                />
                <Tab
                    className={cx('tab')}
                    sx={{ display: 'inline', textAlign: 'start' }}
                    icon={<PersonOutlineIcon className={cx('icon')} sx={{ fontSize: 20 }} />}
                    label="Orders"
                    {...a11yProps(5)}
                />
            </Tabs>
            <TabPanel value={value} index={0}>
                <SalesManagement />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <DataBooking />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <TabProducts />
            </TabPanel>
            <TabPanel value={value} index={3}>
                <TabsNews />
            </TabPanel>
            <TabPanel value={value} index={4}>
                <DataTableUsers />
            </TabPanel>
            <TabPanel value={value} index={5}>
                {/* <BasicDetailPanels /> */}
            </TabPanel>
        </Box>
    );
}

export default VerticalTabs;
