export const leveldata = {
    rooms: [
        // [
        //     [{ orientation: 'N', wall: 'WC', floor: 'W', ceiling: 'W' }, { orientation: 'N', wall: 'A', floor: 'W', ceiling: 'W' }, { orientation: 'E', wall: 'WC', floor: 'W', ceiling: 'W' }],
        //     [{ orientation: 'W', wall: 'A', floor: 'W', ceiling: 'W' }, { floor: 'W', ceiling: 'W', light: '' }, { orientation: 'E', wall: 'W', floor: 'W', ceiling: 'W' }],
        //     [{ orientation: 'W', wall: 'WC', floor: 'W', ceiling: 'W' }, { orientation: 'S', wall: 'A', floor: 'W', ceiling: 'W' }, { orientation: 'S', wall: 'WC', floor: 'W', ceiling: 'W' }]
        // ],
        [
            [{ orientation: 'N', wall: ['WC', 'WCWI'], floor: 'W', ceiling: 'W' }, { orientation: 'N', wall: ['WI', 'W', 'A'], prop: 'prop-books', floor: 'W', ceiling: 'W' }, { orientation: 'E', wall: 'WC', floor: 'W', ceiling: 'W' }],
            [{ orientation: 'W', wall: 'A', floor: 'W', ceiling: 'W',prop: 'prop-bed-single'}, { floor: 'W', ceiling: 'W', light: '' }, { orientation: 'E', wall: ['WI', 'W', 'A'], floor: 'W', ceiling: 'W' }],
            [{ orientation: 'W', wall: ['WC', 'WCWI'], floor: 'W', ceiling: 'W',prop: 'prop-chair1'}, { orientation: 'S', wall: ['WI', 'W'], floor: 'W', ceiling: 'W',prop: 'prop-small-table' }, { orientation: 'S', wall: 'WC', floor: 'W', ceiling: 'W',prop: 'prop-chair2' }]
        ],
        [
            [{ orientation: 'N', wall: ['WCA', 'WC', 'WCWI'], floor: 'W', ceiling: 'W' }, { orientation: 'E', wall: ['WC', 'WCWI'], floor: 'W', ceiling: 'W' }],
            [{ orientation: 'W', wall: ['WC', 'WCWI'], floor: 'W', ceiling: 'W' }, { orientation: 'S', wall: ['WC', 'WCA'], floor: 'W', ceiling: 'W' }]
        ],
        [
            [{ orientation: 'W', wall: ['WE', 'WEA'], floor: 'W', ceiling: 'W' }, { floor: 'W', ceiling: 'W', wall: ['WSA', 'WWSA'], orientation: ['N', 'S'] }, { orientation: 'E', wall: ['WE', 'WEA'], floor: 'W', ceiling: 'W' }],
        ],
        [
            [{ orientation: 'W', wall: ['WE', 'WEA'], floor: 'W', ceiling: 'W' }, { floor: 'W', ceiling: 'W', wall: ['WSA', 'WWSA', 'WS', 'WSWI'], orientation: ['N', 'S'] }, { floor: 'W', ceiling: 'W', wall: ['WSA', 'WWSA', 'WS', 'WSWI'], orientation: ['N', 'S'] }, { floor: 'W', ceiling: 'W', wall: ['WSA', 'WWSA', 'WS', 'WSWI'], orientation: ['N', 'S'] }, { orientation: 'E', wall: ['WE', 'WEA'], floor: 'W', ceiling: 'W' }],
        ],
        [
            [{ orientation: 'N', wall: ['WEA', 'WE', 'WEWI'], floor: 'W', ceiling: 'W' }, {}],
            [{ orientation: 'W', wall: ['WC', 'WCWI'], floor: 'W', ceiling: 'W' }, { orientation: 'E', wall: ['WEA', 'WE', 'WEWI'], floor: 'W', ceiling: 'W' }],
        ],
        [
            [{ orientation: 'N', wall: ['WE', 'WEA', 'WEWI'], floor: 'W', ceiling: 'W' }],
            [{ floor: 'W', ceiling: 'W', wall: ['WSA', 'WWSA'], orientation: ['E', 'W'] }],
            [{ orientation: 'S', wall: ['WE', 'WEA', 'WEWI'], floor: 'W', ceiling: 'W' }],
        ],
        [
            [{ orientation: 'N', wall: ['WE', 'WEA', 'WEWI'], floor: 'W', ceiling: 'W' }],
            [{ floor: 'W', ceiling: 'W', wall: ['WSA', 'WWSA', 'WS', 'WSWI'], orientation: ['E', 'W'] }],
            [{ floor: 'W', ceiling: 'W', wall: ['WSA', 'WWSA', 'WS', 'WSWI'], orientation: ['E', 'W'] }],
            [{ floor: 'W', ceiling: 'W', wall: ['WSA', 'WWSA', 'WS', 'WSWI'], orientation: ['E', 'W'] }],
            [{ orientation: 'S', wall: ['WE', 'WEA', 'WEWI'], floor: 'W', ceiling: 'W' }],
        ],
        [
            [{ orientation: 'N', wall: ['WBSA', 'WBSAWI'], floor: 'W', ceiling: 'W' }]
        ],
    ]
}