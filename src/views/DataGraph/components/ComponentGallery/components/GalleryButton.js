import React from 'react';
import { Button, Icon } from 'semantic-ui-react'

const GalleryButtons = (props) => {
    return (
        <div>
            <p>Page {props.currentPage + 1} of {props.maxPage + 1}</p>
            <Button.Group icon>
                {props.currentPage > 0 ? <Button onClick={() => props.functionality("decrement")}>
                    <Icon name='arrow left' />
                </Button> :
                    <Button disabled>
                        <Icon name='arrow left' />
                    </Button>}
                {props.currentPage != props.maxPage ? <Button onClick={() => props.functionality("increment")}>
                    <Icon name='arrow right' />
                </Button> :
                    <Button disabled>
                        <Icon name='arrow right' />
                    </Button>}
            </Button.Group>

        </div>
    )
}

export default GalleryButtons;