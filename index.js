// silhouette.js 0.0.1

// A javascript implementation of
// https://en.wikipedia.org/wiki/Silhouette_(clustering)

euclidianDistance(a, b) {
    let distance = 0;

    Object.keys(a).forEach((key) => {
        distance += Math.pow(a[key] - b[key], 2);
    });

    return Math.sqrt(distance);
}

// exports
export default Coefficient(clusters, distanceFormula) {

        if(clusters.length <= 1) {
            return 0;
        }

        if(!distanceFormula) {
            distanceFormula = euclidianDistance;
        }

        // calculate mean silhouette score across all clusters
        let s = clusters.map((cluster, clusterIndex) => {
            let s_c;
            if(cluster.length <= 1) {
                s_c = 0;
            }
            else {
                s_c = cluster.map((item, itemIndex) => {
                    // calculate the mean distance to every other item in this cluster (how dissimilar is this item to its cluster)
                    let total = 0;
                    cluster.forEach((itemB, itemBindex) => {
                        total += distanceFormula(item, itemB);
                    }, 0);
                    let a_i = total / (cluster.length - 1);

                    // calculate the mean distance to each neighboring cluster and return the smallest
                    let b_i = Math.min(...(clusters.map((clusterB, clusterBIndex) => {
                        let total = 0;
                        clusterB.forEach((itemB) => {
                            total += distanceFormula(item, itemB);
                        });
                        return total / clusterB.length;
                    })));

                    // silhouette coefficient formula
                    let s_i = (b_i - a_i) / Math.max(a_i, b_i);

                    return s_i
                }) / cluster.length;
            }
            return s_c;
        }) / clusters.length;

        return s;
    }
}
