import React from 'react'
import { Button, Header, Icon, Modal } from "semantic-ui-react";


class DeleteModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = { modalOpen: false }
    }

    handleOpen = () => this.setState({ modalOpen: true })

    handleClose = () => this.setState({ modalOpen: false })


    render() {
        return (
            <Modal
                open={this.state.modalOpen}
                onClose={this.handleClose}
                trigger={<Button onClick={this.handleOpen} basic color='red'>
                    <Icon name='delete' />
                    Delete
                </Button>} basic size='small'>
                <Header icon='archive' content={this.props.title} />
                <Modal.Content>
                    <p>
                        This action cannot be reversed. Are you sure you want to delete this?
                    </p>
                    {this.props.type === "node" ?
                        <p>
                            Note: If the node you are deleting has children (other nodes connected to it further down in the tree), they will also be deleted.
                        </p> :
                        null
                    }

                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={this.handleClose} basic inverted>
                        Cancel
                    </Button>
                    <Button color='red' inverted onClick={() => {
                        this.props.handleDelete()
                        this.handleClose()
                    }}>
                        <Icon name='trash' /> Yes
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    }
}

export default DeleteModal