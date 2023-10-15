<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class MoisController extends AbstractController
{
    #[Route('/mois', name: 'app_mois')]
    public function index(): Response
    {
        $file = json_decode(file_get_contents("json/dataSet.json"), true);
        // dd($file);
        $dataSet = [];
        $mois_12 = [];
        $conso_12 = [];
        $i = 1;
        foreach ($file["mois"] as $key => $mois) {
            $mois_12[] = $mois;
            $conso_12[] = $file["consommation_kWh"][$key];
            if ($i == 12) {
                $dataSet[] = ['mois' => $mois_12, "annee" => $file["annee"][$key], "conso" => $conso_12];
                $i = 0;
                $mois_12 = [];
                $conso_12 = [];
            }
            $i = $i + 1;
        }
        // dd($dataSet);
        return $this->render('mois.html.twig', [
            'controller_name' => 'MoisController',
            "dataSet" => json_encode($dataSet),
            "dataSets" => $dataSet
        ]);
    }
}
