import {HeaderOnly} from "~/components/Layouts"

import Home from '~/pages/Home'
import Following from '~/pages/Following'
import Upload from "~/pages/Upload"
import Profile from "~/pages/Profile"
import Search from "~/pages/Search"

const publicRouter = [
    {path: '/' , component : Home}, 
    {path: '/following' , component : Following}, 
    {path: '/upload' , component : Upload, layout: HeaderOnly}, 
    {path: '/profile' , component : Profile , layout: HeaderOnly}, 
    {path: '/search' , component : Search , layout: null}, 
]

const privateRouter = []

export {publicRouter, privateRouter}