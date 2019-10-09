import React, { Component } from 'react';
// import {
//  Delete,
// 	Modal,
// 	ModalBackground,
// 	ModalCard,
// 	ModalCardHeader,
//  ModalCardTitle,
//  ModalCardBody,
// 	ModalCardFooter,
// 	Button,
// 	ModalClose
// } from 'bloomer';

import {
	Menu,
	Columns,
	Column
} from 'bloomer';

class SettingsModal extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		let { active, toggleModal, initialLoad } = this.props;
        return (

			<Columns>
				<Column isSize={4}>
			<Menu isHidden={active} className={active ? 'animated slideInDown' : 'animated slideOutUp'}>Hello</Menu></Column>
</Columns>
			// <Modal className={active ? 'animated slideInUp' : 'animated slideOutDown'} isActive={initialLoad}>
			// 	<ModalBackground onClick={toggleModal} />
			//     <ModalCard>
			//         <ModalCardHeader>
			//             <ModalCardTitle>Settings</ModalCardTitle>
			//             <Delete onClick={toggleModal} />
			//         </ModalCardHeader>
			//         <ModalCardBody>
			//             <h1>hello</h1>
			//         </ModalCardBody>
			//     </ModalCard>
			// </Modal>

		);
	}
}

export default SettingsModal;
