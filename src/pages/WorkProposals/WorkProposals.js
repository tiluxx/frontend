import { useState, useEffect, useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import classNames from 'classnames/bind'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Avatar from '@mui/joy/Avatar'
import Box from '@mui/joy/Box'
import Card from '@mui/joy/Card'
import CardContent from '@mui/joy/CardContent'
import CardActions from '@mui/joy/CardActions'
import CardOverflow from '@mui/joy/CardOverflow'
import ButtonGroup from '@mui/joy/ButtonGroup'
import Chip from '@mui/joy/Chip'
import List from '@mui/joy/List'
import Button from '@mui/joy/Button'
import Divider from '@mui/joy/Divider'

import { WalletContext } from '../../App'
import Banner from '../../pages/components/Banner'
import config from '../../config'
import styles from './WorkProposals.module.scss'

const cx = classNames.bind(styles)

function WorkProposals() {
    const { contractId, wallet } = useContext(WalletContext)
    const [work, setWork] = useState({})
    const { state } = useLocation()

    useEffect(() => {
        setWork(state?.work)
    }, [])

    useEffect(() => {
        getAllProposalsOfThisJob(work)
            .then((res) => {
                const { status, data } = JSON.parse(res)
                console.log(JSON.parse(res))
                console.log(data)
                // if (status) {
                //     setWork([...data])
                // }
            })
            .catch((alert) => {
                console.log(alert)
            })
        // .finally(() => {
        //     setUiPleaseWait(false)
        // })
        getAllProposalsOfThisJob({ id: 1 })
            .then((res) => {
                const { status, data } = JSON.parse(res)
                console.log(JSON.parse(res))
                console.log(data)
            })
            .catch((alert) => {
                console.log(alert)
            })
        getAll().then((res) => {
            console.log(JSON.parse(res))
        })
    }, [work])

    const getAllProposalsOfThisJob = (work) => {
        console.log(work?.id)
        return wallet.viewMethod({ method: 'GetJobRegister', contractId, args: { id: work?.id } })
    }

    const getAll = () => {
        return wallet.viewMethod({ method: 'GetData', contractId })
    }

    const chooseFreelancerHandler = (freelancerId) => {
        wallet
            .callMethod({ method: 'ChooseFreelancer', args: { userId: freelancerId, jobId: work?.id }, contractId })
            .then(async (res) => {
                // return getGreeting()
                setOpenModal(true)
                console.log(res)
            })
        // .then(setValueFromBlockchain)
        // .finally(() => {
        //     setUiPleaseWait(false)
        // })
    }

    return (
        <div>
            <Container>
                <Row>
                    {/* Banner */}
                    <Col xs={12} className={cx('banner-wrapper')}>
                        <Banner title="Browse Work" />
                    </Col>

                    {/* Works grid */}
                    <Col xs={12} md={8}>
                        <List
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                                gap: 2,
                            }}
                        >
                            {[...Array(3)].map((_, index) => (
                                <Card
                                    key={index}
                                    component="li"
                                    variant="outlined"
                                    sx={{
                                        width: '100%',
                                        borderRadius: 'sm',
                                        p: 2,
                                        listStyle: 'none',
                                    }}
                                >
                                    <CardContent>
                                        <Box sx={{ display: 'flex', gap: 2 }}>
                                            <Avatar
                                                src="/static/images/avatar/1.jpg"
                                                sx={{ '--Avatar-size': '4rem' }}
                                            />
                                            <Box>
                                                <h5 className={cx('talent-name')}>Josephine Blanton</h5>
                                                <h6 className={cx('talent-role')}>Blockchain Developer</h6>
                                            </Box>
                                        </Box>
                                        <Divider component="div" sx={{ my: 2 }} />
                                        <Box>
                                            <p className={cx('talent-bio')}>
                                                Hello, this is my bio and I am a PRO member of MUI. I am a developer and
                                                I love to code.
                                            </p>
                                        </Box>
                                        <Divider component="div" sx={{ my: 2 }} />
                                        <h6 className={cx('skill-tags-title')}>Skills tags</h6>
                                        <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
                                            <Chip
                                                variant="soft"
                                                color="neutral"
                                                size="lg"
                                                sx={{ pointerEvents: 'none' }}
                                            >
                                                BOS
                                            </Chip>
                                            <Chip
                                                variant="soft"
                                                color="neutral"
                                                size="lg"
                                                sx={{ pointerEvents: 'none' }}
                                            >
                                                React
                                            </Chip>
                                            <Chip
                                                variant="soft"
                                                color="neutral"
                                                size="lg"
                                                sx={{ pointerEvents: 'none' }}
                                            >
                                                Rust
                                            </Chip>
                                        </Box>
                                    </CardContent>
                                    <CardOverflow sx={{ mt: 1 }}>
                                        <CardActions buttonFlex="1">
                                            <ButtonGroup variant="outlined" sx={{ bgcolor: 'background.surface' }}>
                                                <Link to={config.routes.messages}>
                                                    <Button>Message</Button>
                                                </Link>
                                                <Button onClick={chooseFreelancerHandler}>Choose</Button>
                                            </ButtonGroup>
                                        </CardActions>
                                    </CardOverflow>
                                </Card>
                            ))}
                        </List>
                    </Col>

                    {/* Work card */}
                    <Col xs={0} md={4}>
                        <Card
                            variant="outlined"
                            sx={{
                                width: '100%',
                            }}
                            className={cx('work-wrapper')}
                        >
                            <CardContent>
                                <Box>
                                    <Row>
                                        <Col xs={12}>
                                            <h5 className={cx('work-title')}>{work.title}</h5>
                                        </Col>
                                        <Col xs={12}>
                                            <small className={cx('work-subtitle')}>
                                                <span
                                                    className={cx('work-subtitle_price')}
                                                >{`Fixed price: $${work.money}`}</span>
                                                <span>
                                                    &nbsp;-&nbsp;<span>Entry level</span>
                                                </span>
                                            </small>
                                        </Col>
                                    </Row>
                                </Box>
                                <Box>
                                    <p className={cx('work-desc')}>{work.description}</p>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
                                    <Chip variant="soft" color="neutral" size="lg" sx={{ pointerEvents: 'none' }}>
                                        {work.category}
                                    </Chip>
                                    <Chip variant="soft" color="neutral" size="lg" sx={{ pointerEvents: 'none' }}>
                                        AI
                                    </Chip>
                                    <Chip variant="soft" color="neutral" size="lg" sx={{ pointerEvents: 'none' }}>
                                        UI/UX
                                    </Chip>
                                </Box>
                            </CardContent>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default WorkProposals
