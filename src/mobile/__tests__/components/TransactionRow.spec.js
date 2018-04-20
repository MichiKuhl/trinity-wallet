import assign from 'lodash/assign';
import noop from 'lodash/noop';
import React from 'react';
import PropTypes from 'prop-types';
import { shallow } from 'enzyme';
import TransactionRow from '../../components/TransactionRow';

jest.mock('react-native-is-device-rooted', () => ({
    isDeviceRooted: () => true,
    isDeviceLocked: () => false,
}));

const getProps = (overrides) =>
    assign(
        {},
        {
            generateAlert: noop,
            t: (arg) => {
                const translations = {
                    'send:message': 'Message',
                };

                return translations[arg] ? translations[arg] : 'foo';
            },
            rebroadcast: noop,
            promote: noop,
            status: 'Receive',
            confirmation: 'Received',
            disableWhen: false,
            value: 200,
            unit: 'i',
            time: Date.now(),
            message: 'Honey and the moon',
            bundle: 'BUNDLE',
            addresses: [{ address: 'U'.repeat(81), value: 1, unit: 'i' }],
            confirmationBool: false,
            mode: 'Standard',
            style: {
                titleColor: 'white',
                containerBorderColor: { borderColor: 'white' },
                containerBackgroundColor: { backgroundColor: 'white' },
                confirmationStatusColor: { color: 'red' },
                defaultTextColor: { color: 'green' },
                backgroundColor: 'yellow',
                borderColor: { borderColor: 'white' },
                barColor: 'white',
                barBg: 'white',
                buttonsOpacity: { opacity: 1 },
            },
            toggleModalActivity: noop,
        },
        overrides,
    );

describe('Testing TransactionRow component', () => {
    describe('propTypes', () => {
        it('should require a t function as a prop', () => {
            expect(TransactionRow.propTypes.t).toEqual(PropTypes.func.isRequired);
        });

        it('should require a status string as a prop', () => {
            expect(TransactionRow.propTypes.status).toEqual(PropTypes.string.isRequired);
        });

        it('should require a confirmation string as a prop', () => {
            expect(TransactionRow.propTypes.confirmation).toEqual(PropTypes.string.isRequired);
        });

        it('should require a value number as a prop', () => {
            expect(TransactionRow.propTypes.value).toEqual(PropTypes.number.isRequired);
        });

        it('should require a unit string as a prop', () => {
            expect(TransactionRow.propTypes.unit).toEqual(PropTypes.string.isRequired);
        });

        it('should require a time number as a prop', () => {
            expect(TransactionRow.propTypes.time).toEqual(PropTypes.number.isRequired);
        });

        it('should require a message string as a prop', () => {
            expect(TransactionRow.propTypes.message).toEqual(PropTypes.string);
        });
    });

    describe('when renders', () => {
        it('should not explode', () => {
            const props = getProps();

            const wrapper = shallow(<TransactionRow {...props} />);
            expect(wrapper.name()).toEqual('TouchableOpacity');
        });

        it('should return seven View components', () => {
            const props = getProps();

            const wrapper = shallow(<TransactionRow {...props} />);
            expect(wrapper.find('View').length).toEqual(7);
        });

        it('should return five Text components', () => {
            const props = getProps();

            const wrapper = shallow(<TransactionRow {...props} />);
            expect(wrapper.find('Text').length).toEqual(5);
        });

        it('should return status prop as a child to first Text component', () => {
            const props = getProps();

            const wrapper = shallow(<TransactionRow {...props} />);
            expect(
                wrapper
                    .find('Text')
                    .at(0)
                    .children()
                    .at(0)
                    .text(),
            ).toEqual('Receive');
        });

        it('should return value prop as third child to first Text component', () => {
            const props = getProps();

            const wrapper = shallow(<TransactionRow {...props} />);
            expect(
                wrapper
                    .find('Text')
                    .at(0)
                    .children()
                    .at(2)
                    .text(),
            ).toEqual('200');
        });

        it('should return unit prop as fifth child to first Text component', () => {
            const props = getProps();

            const wrapper = shallow(<TransactionRow {...props} />);
            expect(
                wrapper
                    .find('Text')
                    .at(0)
                    .children()
                    .at(3)
                    .text(),
            ).toEqual('i');
        });

        it('should return confirmation prop as a child to second Text component', () => {
            const props = getProps();

            const wrapper = shallow(<TransactionRow {...props} />);
            expect(
                wrapper
                    .find('Text')
                    .at(1)
                    .children()
                    .text(),
            ).toEqual('Received');
        });

        it('should return a translated "message" as first child to third Text component', () => {
            const props = getProps();

            const wrapper = shallow(<TransactionRow {...props} />);
            expect(
                wrapper
                    .find('Text')
                    .at(2)
                    .children()
                    .at(0)
                    .text(),
            ).toEqual('Message');
        });

        it('should return a ":" as second child to third Text component', () => {
            const props = getProps();

            const wrapper = shallow(<TransactionRow {...props} />);
            expect(
                wrapper
                    .find('Text')
                    .at(2)
                    .children()
                    .at(1)
                    .text(),
            ).toEqual(':');
        });

        it('should return message prop as a child to fourth Text component', () => {
            const props = getProps();

            const wrapper = shallow(<TransactionRow {...props} />);
            expect(
                wrapper
                    .find('Text')
                    .at(3)
                    .children()
                    .text(),
            ).toEqual('Honey and the moon');
        });
    });
});
