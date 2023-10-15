<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class CriteresController extends AbstractController
{
    #[Route('/criteres', name: 'app_criteres')]
    public function index(): Response
    {
        return $this->render('criteres.html.twig', [
            'controller_name' => 'CriteresController',
        ]);
    }
}
