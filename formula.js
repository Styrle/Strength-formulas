function dots_poly(a,b,c,d,e,x) {
        var x2=x*x,x3=x2*x,x4=x3*x;
        return 500.0 / (a*x4+b*x3+c*x2+d*x+e);
      }
      function dots_men(bw) {
        bw = Math.min(Math.max(bw, 40.0), 210.0);
        return dots_poly(-0.0000010930,0.0007391293,-0.1918759221,24.0900756,-307.75076,bw);
      }
      function dots_women(bw) {
        bw = Math.min(Math.max(bw, 40.0), 150.0);
        return dots_poly(-0.0000010706,0.0005158568,-0.1126655495,13.6175032,-57.96288,bw);
      }

      var PARAMETERS = {
        "M": {
          "Raw": {
            "SBD": [1199.72839, 1025.18162, 0.009210],
            "B": [320.98041, 281.40258, 0.01008]
          },
          "Single-ply": {
            "SBD": [1236.25115, 1449.21864, 0.01644],
            "B": [381.22073, 733.79378, 0.02398]
          }
        },
        "F": {
          "Raw": {
            "SBD": [610.32796, 1045.59282, 0.03048],
            "B": [142.40398, 442.52671, 0.04724]
          },
          "Single-ply": {
            "SBD": [758.63878, 949.31382, 0.02435],
            "B": [221.82209, 357.00377, 0.02937]
          }
        }
      };

      function getRadioValue(name) {
        var radios = document.getElementsByName(name);
        for (var i = 0; i < radios.length; ++i) {
          if (radios[i].checked) { return radios[i].value; }
        }
      }

      function calc() {
        var units = getRadioValue("units");
        var sex = getRadioValue("sex");
        var equipment = getRadioValue("equipment");
        var event = getRadioValue("event");
        var bw = Number(document.getElementById("bodyweight").value);
        var total = Number(document.getElementById("total").value);

        if (units === "lbs") {
          bw = bw / 2.20462262;
          total = total / 2.20462262;
        }

        var dots = total * ((sex === "M") ? dots_men(bw) : dots_women(bw));

        var params = PARAMETERS[sex][equipment][event];
        var denom = params[0] - (params[1] * Math.exp(-1.0 * params[2] * bw))
        var glp = (denom === 0) ? 0 : Math.max(0, total * 100.0 / denom)
        if (isNaN(glp) || bw < 35) {
          glp = 0;
        }

        document.getElementById("display-glp").innerHTML = glp.toFixed(2);
        document.getElementById("display-dots").innerHTML = dots.toFixed(2) + " Dots";
      }
      document.addEventListener("DOMContentLoaded", function(e){calc()});
