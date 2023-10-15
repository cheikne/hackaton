<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use League\Csv\Reader;

class AnneeController extends AbstractController
{
    #[Route('/annee', name: 'app_annee')]
    public function index(): Response
    {
        $file = json_decode(file_get_contents("json/dataSet.json"), true);

        $dataSet = [];
        $annees = [];
        $som = 0;
        $conso_12 = [];
        $i = 1;
        $k = 0;
        foreach ($file["mois"] as $key => $mois) {
            $mois_12[] = $mois;
            $som = $som + $file["consommation_kWh"][$key];
            if ($i == 12) {
                $annees[] = $file["annee"][$key];
                $i = 1;
                $conso_12[] = $som;
                $som = 0;
            }
            $i = $i + 1;
        }
        $dataSet['annees'] = $annees;
        $dataSet["conso"]  = $conso_12;
        $dataSet["status"]  = "annee";
        // dd($dataSet);
        return $this->render('annee.html.twig', [
            'controller_name' => 'AnneeController',
            'dataSet' => json_encode($dataSet),
            'dataSets' => $dataSet
        ]);
    }
}
