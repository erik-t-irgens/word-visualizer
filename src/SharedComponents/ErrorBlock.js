import React, { Fragment } from 'react'
import { Segment, Icon, Header, Grid } from 'semantic-ui-react'

class ErrorBlock extends React.Component {
    render() {
        const { error } = this.props;
        if (error) {
            return (<Grid.Row columns={1} centered>
                <Grid.Column textAlign='center' width={6}>
                    <Segment placeholder>
                        <Header as='h1' icon>
                            <Icon name='exclamation' />
                            Error
                            <Header.Subheader>
                                {error}
                            </Header.Subheader>
                        </Header>
                    </Segment>
                    <div style={{ textAlign: 'center' }}>
                        please contact <a
                            href='mailto:erik.t.irgens'>@gmail.com</a> if this
                    issue persists
                    </div>
                </Grid.Column>
            </Grid.Row>)
        } else {
            return <Fragment />
        }
    }
}

export default ErrorBlock