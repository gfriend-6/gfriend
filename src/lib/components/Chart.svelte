<script>
    import { Line } from 'svelte-chartjs'
    import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale } from 'chart.js';
    ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale);
    import { Card } from 'flowbite-svelte';
    import { chart } from '../data/chart.js';
    export const options = {
        responsive: true, 
        interaction: false,
        scales: {
            y: {
                max: 150,
                min: 0,
                display: false
            },
            x: {
                display: false
            }
        }
        
    }
</script>
<Card size="xxl">
<Line data={chart} options={options}/>
</Card>