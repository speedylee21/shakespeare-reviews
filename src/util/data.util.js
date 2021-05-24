const dataUtilities = {
    groupBy: (data, groupFn) => {
        let byGroup = {};
        data.forEach(item => {
            const group = groupFn(item);
            if (byGroup[group]) {
                byGroup[group].push(item);
            } else {
                byGroup[group] = [item];
            }
        });

        return byGroup;
    }
};

export default dataUtilities;