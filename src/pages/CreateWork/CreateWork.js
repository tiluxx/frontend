import { Fragment, useState, useContext } from 'react'
import classNames from 'classnames/bind'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Box from '@mui/joy/Box'
import Card from '@mui/joy/Card'
import CardActions from '@mui/joy/CardActions'
import CardContent from '@mui/joy/CardContent'
import Divider from '@mui/joy/Divider'
import FormControl from '@mui/joy/FormControl'
import FormLabel from '@mui/joy/FormLabel'
import Input from '@mui/joy/Input'
import Textarea from '@mui/joy/Textarea'
import Select from '@mui/joy/Select'
import Option from '@mui/joy/Option'
import Avatar from '@mui/joy/Avatar'
import Chip from '@mui/joy/Chip'
import Typography from '@mui/joy/Typography'

import { WalletContext } from '../../App'
import Banner from '../../pages/components/Banner'
import styles from './CreateWork.module.scss'

const cx = classNames.bind(styles)

function CreateWork() {
    const { contractId, wallet } = useContext(WalletContext)
    const [currency, setCurrency] = useState('dollar')

    const createWorkHandler = (e) => {
        e.preventDefault()
        console.log(e.target)
        console.log(e.target.elements)
        const { workTitle, workCategory, workDesc, workDue, workBudget } = e.target.elements

        wallet
            .callMethod({
                method: 'CreateJob',
                args: {
                    title: workTitle.value,
                    description: workDesc.value,
                    category: workCategory.value,
                    money: workBudget.value,
                },
                contractId,
            })
            .then(async (res) => {
                console.log(res)
                console.log(getAllJob())
                // set modal open = true to navigate to work dashboard
                // return getAllJob()
            })
            // .then(setValueFromBlockchain)
            // .finally(() => {
            //     setUiPleaseWait(false)
            // })
    }

    const getAllJob = () => {
        return wallet.viewMethod({ method: 'GetJob', contractId })
    }

    return (
        <div>
            <Box>
                <Container>
                    <Row>
                        {/* Banner */}
                        <Col xs={12} className={cx('banner-wrapper')}>
                            <Banner title="Post New Work" />
                        </Col>

                        {/* Create job form */}
                        <Col xs={12} lg={8}>
                            <Card
                                variant="outlined"
                                sx={{
                                    maxHeight: 'max-content',
                                    maxWidth: '100%',
                                    mx: 'auto',
                                    px: '40px',
                                    py: '32px',
                                }}
                            >
                                <h3 className={cx('form-title')}>About the work</h3>
                                <Divider insert="none" />
                                <form onSubmit={createWorkHandler}>
                                <CardContent
                                    sx={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(2, minmax(80px, 1fr))',
                                        gap: 1.5,
                                    }}
                                >
                                        <FormControl sx={{ gridColumn: '1/-1' }}>
                                            <FormLabel sx={{ my: '12px' }}>Give your project brief a title</FormLabel>
                                            <Input
                                                slotProps={{
                                                    input: {
                                                        name: 'workTitle',
                                                    },
                                                }}
                                            />
                                        </FormControl>
                                        <FormControl sx={{ gridColumn: '1/-1' }}>
                                            <FormLabel>What is your work's category?</FormLabel>
                                            <Input
                                                slotProps={{
                                                    input: {
                                                        name: 'workCategory',
                                                    },
                                                }}
                                            />
                                        </FormControl>
                                        <FormControl sx={{ gridColumn: '1/-1' }}>
                                            <FormLabel>What are you looking to get done?</FormLabel>
                                            <Textarea
                                                slotProps={{
                                                    textarea: {
                                                        name: 'workDesc',
                                                    },
                                                }}
                                            />
                                        </FormControl>
                                        <FormControl sx={{ gridColumn: '1/-1' }}>
                                            <FormLabel>What is your timeline?</FormLabel>
                                            <Input
                                                type="date"
                                                slotProps={{
                                                    input: {
                                                        name: 'workDue',
                                                    },
                                                }}
                                            />
                                        </FormControl>
                                        <FormControl sx={{ gridColumn: '1/-1' }}>
                                            <FormLabel>What is your budget?</FormLabel>
                                            <Input
                                                placeholder="Amount"
                                                startDecorator={{ dollar: '$', baht: '฿', yen: '¥' }[currency]}
                                                endDecorator={
                                                    <Fragment>
                                                        <Divider orientation="vertical" />
                                                        <Select
                                                            variant="plain"
                                                            value={currency}
                                                            onChange={(_, value) => setCurrency(value)}
                                                            sx={{ '&:hover': { bgcolor: 'transparent' } }}
                                                        >
                                                            <Option value="dollar">US dollar</Option>
                                                            <Option value="baht">Thai baht</Option>
                                                            <Option value="yen">Japanese yen</Option>
                                                        </Select>
                                                    </Fragment>
                                                }
                                                slotProps={{
                                                    input: {
                                                        name: 'workBudget',
                                                    },
                                                }}
                                            />
                                        </FormControl>
                                        <FormControl sx={{ gridColumn: '1/-1' }}>
                                            <FormLabel>Attach Files</FormLabel>
                                            <Input
                                                type="file"
                                                slotProps={{
                                                    input: {
                                                        name: 'work-attachments',
                                                    },
                                                }}
                                            />
                                        </FormControl>
                                        <CardActions sx={{ gridColumn: '1/-1', my: '24px' }}>
                                            <button
                                                className="btn rounded-pill btn-primary-style w-100 fw-bold"
                                                type="submit"
                                            >
                                                Save and Post
                                            </button>
                                        </CardActions>
                                </CardContent>
                                    </form>
                            </Card>
                        </Col>
                        <Col xs={12} lg={4}>
                            <Card
                                variant="outlined"
                                sx={{
                                    width: '100%',
                                }}
                            >
                                <CardContent sx={{ alignItems: 'center', textAlign: 'center' }}>
                                    <Avatar src="/static/images/avatar/1.jpg" sx={{ '--Avatar-size': '4rem' }} />
                                    <Chip
                                        size="sm"
                                        variant="soft"
                                        color="primary"
                                        sx={{ mt: -1, border: '3px solid', borderColor: 'background.surface' }}
                                    >
                                        PRO
                                    </Chip>
                                    <Typography fontSize="lg" fontWeight="lg" sx={{ mt: 1, mb: 0.5 }}>
                                        Tien Le
                                    </Typography>
                                    <Typography level="body2" sx={{ maxWidth: '24ch' }}>
                                        Hello, this is my bio and I am a PRO member of Freelance dApp. I am a developer
                                        and I love to code.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </Box>
        </div>
    )
}

export default CreateWork