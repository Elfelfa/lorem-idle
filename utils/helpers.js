module.exports = {
    calcTimePassed: async (data) => {
        const userData = data;
        
        /////////////////////////////////////////
        // Timestamp array index definitions:  //
        // 0: YYYY                             //
        // 1: MM                               //
        // 2: DD                               //
        // 3: hh                               //
        // 4: mm                               //
        // 5: ss                               //
        /////////////////////////////////////////

        var oldTS = userData.timestamp.split('/');
        var t = dayjs().format('YYYY/MM/DD/hh/mm/ss');
        var newTS = t.split('/');

        var timePassed;

        // Loop that converts the timestamp arrays into integers.
        for (var i = 0; i < 2; i++) {
            var temp = [];

            switch (i) {
                case 0:
                    for (var k = 0; k < oldTS.length; k++) {
                        temp.push(parseInt(oldTS[k]));
                    };

                    oldTS.length = 0;
                    oldTS.concat(temp);
                    break;
                case 1:
                    for (var k = 0; k < newTS.length; k++) {
                        temp.push(parseInt(newTS[k]));
                    };
                    newTS.length = 0;
                    newTS.concat(temp);
                    break;
            };

            temp.length = 0;
        };

        if ((newTS[0] - oldTS[0]) <= 0) {
            if ((newTS[1] - oldTS[1]) <= 0) {
                if ((newTS[2] - oldTS[2]) <= 1) {
                    if ((newTS[3] - oldTS[3]) < 0) {
                        var hours = ((newTS[3] - oldTS[3]) + 24);
                        var minutes = ((60 - oldTS[4]) + newTS[4]);
                        var seconds = ((60 - oldTS[5]) + newTS[5]);

                        timePassed = (((hours * 60) * 60) + (minutes * 60) + seconds);
                    } else {
                        timePassed = ((24 * 60) * 60);
                    };
                } else {
                    timePassed = ((24 * 60) * 60);
                };
            } else {
                timePassed = ((24 * 60) * 60);
            };
        } else {
            timePassed = ((24 * 60) * 60);
        };

        return timePassed;
    },
};